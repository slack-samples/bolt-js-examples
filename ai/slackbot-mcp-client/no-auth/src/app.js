import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { App, isValidSlackRequest, LogLevel } from "@slack/bolt";
import { z } from "zod";

/**
 * Creates an MCP server with a dice roller tool.
 * @see {@link https://github.com/modelcontextprotocol/typescript-sdk#getting-started}
 */
function createServer() {
  const server = new McpServer({ name: "Dice Game", version: "1.0.0" });

  server.registerTool(
    "roll_dice",
    {
      title: "Roll Dice",
      description: "Roll one or more dice with a configurable number of sides.",
      inputSchema: {
        sides: z
          .number()
          .default(6)
          .describe("Number of sides on each die (e.g., 6, 20)"),
        count: z.number().default(1).describe("Number of dice to roll"),
      },
      annotations: {
        readOnlyHint: true,
      },
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
          {
            type: "text",
            text: `Rolled ${label}:${rollsDisplay} = ${total}`,
          },
        ],
      };
    },
  );

  return server;
}

/**
 * Creates a Bolt app with custom /mcp route.
 * @see {@link https://docs.slack.dev/tools/bolt-js/getting-started}
 */
export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.INFO,
  customRoutes: [
    {
      path: "/mcp",
      method: "POST",
      handler: async (req, res) => {
        const chunks = [];
        for await (const chunk of req) {
          chunks.push(chunk);
        }
        const rawBody = Buffer.concat(chunks).toString();

        if (
          !isValidSlackRequest({
            signingSecret: `${process.env.SLACK_SIGNING_SECRET}`,
            headers: /** @type {any} */ (req.headers),
            body: rawBody,
          })
        ) {
          res.writeHead(401, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              jsonrpc: "2.0",
              error: { code: -32600, message: "Invalid request" },
              id: null,
            }),
          );
        }

        const body = JSON.parse(rawBody);
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
