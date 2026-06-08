import 'dotenv/config';

import crypto from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { App, LogLevel } from '@slack/bolt';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';

// --- Slack signature verification ---

function verifySlackRequest({ signingSecret, timestamp, signature, body }) {
  const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 60 * 5;
  if (Number.parseInt(timestamp, 10) < fiveMinutesAgo) return false;

  const sig = `v0=${crypto.createHmac('sha256', signingSecret).update(`v0:${timestamp}:${body}`).digest('hex')}`;
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(signature));
}

// --- Notes search logic ---

const NOTES_DIR = join(import.meta.dirname, 'notes');

function searchNotes(teamId, userId, query) {
  const results = [];
  const lowerQuery = query.toLowerCase();

  for (const [label, filePath] of [
    ['personal', join(NOTES_DIR, `${teamId}-${userId}.md`)],
    ['shared', join(NOTES_DIR, `${teamId}.md`)],
  ]) {
    if (!existsSync(filePath)) continue;
    const content = readFileSync(filePath, 'utf-8');
    let currentHeading = '';
    let currentBody = [];

    for (const line of content.split('\n')) {
      if (line.startsWith('## ')) {
        if (currentHeading && currentHeading.toLowerCase().includes(lowerQuery)) {
          results.push(`[${label}] ## ${currentHeading}\n${currentBody.join('\n').trim()}`);
        }
        currentHeading = line.slice(3).trim();
        currentBody = [];
      } else {
        currentBody.push(line);
      }
    }
    if (currentHeading && currentHeading.toLowerCase().includes(lowerQuery)) {
      results.push(`[${label}] ## ${currentHeading}\n${currentBody.join('\n').trim()}`);
    }
  }

  return results;
}

// --- MCP Server: search_notes (Slack identity auth) ---

function createServer() {
  const server = new McpServer({ name: 'slack-notes', version: '1.0.0' }, { capabilities: { tools: {} } });

  server.tool(
    'search_notes',
    'Search personal and shared team notes. Returns sections matching the query.',
    { query: z.string().describe('Search query to match against note headings') },
    async ({ query }, { _meta }) => {
      const slack = _meta?.slack;
      if (!slack?.user_id || !slack?.team_id) {
        return { content: [{ type: 'text', text: 'Missing Slack identity context.' }] };
      }

      const results = searchNotes(slack.team_id, slack.user_id, query);
      if (results.length === 0) {
        return { content: [{ type: 'text', text: `No notes found matching "${query}".` }] };
      }
      return { content: [{ type: 'text', text: results.join('\n\n') }] };
    },
  );

  return server;
}

// --- Bolt App ---

const app = new App({
  logLevel: LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'mcp-slack-identity-example',
  scopes: ['mcp:connect'],
  installationStore: {
    storeInstallation: async () => {},
    fetchInstallation: async () => {},
  },
});

const port = Number.parseInt(process.env.PORT || '3000', 10);
await app.start(port);

// Mount MCP endpoint with Slack signature verification
app.receiver.app.post('/mcp', async (req, res) => {
  const timestamp = req.headers['x-slack-request-timestamp'];
  const signature = req.headers['x-slack-signature'];

  if (!timestamp || !signature) {
    return res.status(401).json({ jsonrpc: '2.0', error: { code: -32600, message: 'Missing Slack headers' }, id: null });
  }

  const rawBody = JSON.stringify(req.body);
  if (!verifySlackRequest({ signingSecret: process.env.SLACK_SIGNING_SECRET, timestamp, signature, body: rawBody })) {
    return res.status(401).json({ jsonrpc: '2.0', error: { code: -32600, message: 'Invalid signature' }, id: null });
  }

  const server = createServer();
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

console.log(`⚡ MCP Server (slack-identity) running on port ${port}`);
console.log(`   POST http://localhost:${port}/mcp`);
