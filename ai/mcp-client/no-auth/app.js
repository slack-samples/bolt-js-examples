import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { App, LogLevel } from "@slack/bolt";
import { z } from "zod";

// --- MCP Server: roll_dice (no auth, interactive Block Kit) ---

function createServer() {
  const server = new McpServer(
    { name: "dice-roller", version: "1.0.0" },
    { capabilities: { tools: {} } },
  );

  server.tool(
    "roll_dice",
    "Roll one or more dice with a configurable number of sides.",
    {
      sides: z
        .number()
        .default(6)
        .describe("Number of sides on each die (e.g., 6, 20)"),
      count: z.number().default(1).describe("Number of dice to roll"),
    },
    async ({ sides, count }) => {
      const rolls = Array.from(
        { length: count },
        () => Math.floor(Math.random() * sides) + 1,
      );
      const total = rolls.reduce((sum, r) => sum + r, 0);
      const label = `${count}d${sides}`;
      const rollsDisplay = count > 1 ? ` [${rolls.join(", ")}]` : "";

      return {
        content: [
          { type: "text", text: `Rolled ${label}:${rollsDisplay} = ${total}` },
        ],
        _meta: {
          slack: {
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `🎲 *${label}* →${rollsDisplay} *${total}*`,
                },
              },
              {
                type: "actions",
                elements: [
                  {
                    type: "button",
                    text: { type: "plain_text", text: "🎲 Roll again" },
                    action_id: "tool:roll_dice",
                    value: JSON.stringify({ sides, count }),
                  },
                ],
              },
            ],
          },
        },
      };
    },
  );

  return server;
}

// --- Bolt App (HTTP mode with custom /mcp route) ---

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
  customRoutes: [
    {
      path: "/mcp",
      method: "POST",
      handler: async (req, res) => {
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const body = JSON.parse(Buffer.concat(chunks).toString());

        const server = createServer();
        const transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: undefined,
        });
        await server.connect(transport);
        await transport.handleRequest(req, res, body);
      },
    },
  ],
});

const port = Number.parseInt(process.env.PORT || "3000", 10);
await app.start(port);

console.log(`⚡ MCP Dice Roller (no-auth) running on port ${port}`);
console.log(`   POST http://localhost:${port}/mcp`);
