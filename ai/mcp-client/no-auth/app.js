import 'dotenv/config';

import { App, LogLevel } from '@slack/bolt';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';

// --- MCP Server: read_docs (no auth) ---

const ALLOWED_URLS = ['https://docs.slack.dev/llms.txt', 'https://docs.slack.dev/llms-full.txt'];

function createServer() {
  const server = new McpServer({ name: 'slack-docs', version: '1.0.0' }, { capabilities: { tools: {} } });

  server.tool(
    'read_docs',
    'Read public Slack developer documentation. Returns content from docs.slack.dev.',
    { url: z.string().describe('The documentation URL to fetch (e.g., https://docs.slack.dev/llms.txt)') },
    async ({ url }) => {
      if (!ALLOWED_URLS.some((allowed) => url.startsWith(allowed))) {
        return { content: [{ type: 'text', text: `URL not allowed. Allowed URLs:\n${ALLOWED_URLS.join('\n')}` }] };
      }
      const response = await fetch(url);
      if (!response.ok) {
        return { content: [{ type: 'text', text: `Failed to fetch: HTTP ${response.status}` }] };
      }
      return { content: [{ type: 'text', text: await response.text() }] };
    },
  );

  return server;
}

// --- Bolt App ---

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
});

const port = Number.parseInt(process.env.PORT || '3000', 10);
await app.start(port);

// Mount MCP endpoint
app.receiver.app.post('/mcp', async (req, res) => {
  const server = createServer();
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
});

console.log(`⚡ MCP Server (no-auth) running on port ${port}`);
console.log(`   POST http://localhost:${port}/mcp`);
