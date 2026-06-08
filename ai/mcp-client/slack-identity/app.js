import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { App, isValidSlackRequest, LogLevel } from "@slack/bolt";
import { FileInstallationStore } from "@slack/oauth";
import { z } from "zod";

// --- MCP Server: get_profile_card (Slack identity auth) ---

function createServer(client, installationStore, logger) {
  const server = new McpServer({ name: "slack-profile", version: "1.0.0" });

  server.registerTool(
    "get_profile_card",
    {
      description: "Get a profile card for a Slack user by their user ID.",
      inputSchema: {
        user_id: z
          .string()
          .describe("The Slack user ID to look up (e.g. U01234ABCDE)"),
      },
      _meta: {
        slack: {
          supportsBlockKit: true,
        },
      },
    },
    async ({ user_id }, { _meta }) => {
      const slack = _meta?.slack;

      if (!slack?.user_id || !slack?.team_id) {
        return {
          content: [
            {
              type: "text",
              text: "Sign in with Slack to look up user profiles.",
            },
          ],
        };
      }

      let botToken;
      try {
        const installation = await installationStore.fetchInstallation({
          teamId: slack.team_id,
          userId: slack.user_id,
          ...(slack.enterprise_id && { enterpriseId: slack.enterprise_id }),
          isEnterpriseInstall: !!slack.enterprise_id,
        });
        botToken = installation.bot.token;
      } catch (err) {
        logger.error(err.message);
        return {
          content: [
            {
              type: "text",
              text: "App not installed for this workspace. Please install first.",
            },
          ],
          _meta: {
            slack: {
              blocks: [
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: "This app needs to be installed before it can look up profiles.",
                  },
                  accessory: {
                    type: "button",
                    text: {
                      type: "plain_text",
                      text: "Install",
                    },
                    url: `${process.env.BASE_URL}/slack/install`,
                    action_id: "install_app",
                  },
                },
              ],
            },
          },
        };
      }

      const { user } = await client.users.info({
        token: botToken,
        user: user_id,
      });
      const { profile } = user;

      const subtitle = [
        profile.title,
        profile.status_emoji
          ? `${profile.status_emoji} ${profile.status_text}`
          : null,
      ]
        .filter(Boolean)
        .join(" · ");

      return {
        content: [
          {
            type: "text",
            text: `Profile card for ${profile.real_name_normalized || user.name}`,
          },
        ],
        _meta: {
          slack: {
            blocks: [
              {
                type: "card",
                icon: profile.image_72
                  ? {
                      type: "image",
                      image_url: profile.image_72,
                      alt_text: profile.real_name_normalized || user.name,
                    }
                  : undefined,
                title: {
                  type: "mrkdwn",
                  text: profile.real_name_normalized || user.name,
                },
                subtitle: subtitle
                  ? { type: "mrkdwn", text: subtitle }
                  : undefined,
                body: {
                  type: "mrkdwn",
                  text: [
                    `*Email:* ${profile.email || "N/A"}`,
                    `*Timezone:* ${user.tz_label || "N/A"}`,
                    `*Display name:* @${profile.display_name_normalized || user.name}`,
                  ].join("\n"),
                },
              },
            ],
          },
        },
      };
    },
  );

  return server;
}

// --- Bolt App (HTTP mode with OAuth install flow + custom /mcp route) ---

const installationStore = new FileInstallationStore({
  baseDir: "./installations",
});

const app = new App({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  stateSecret: process.env.SLACK_STATE_SECRET,
  scopes: ["mcp:connect", "users:read", "users:read.email"],
  installationStore,
  logLevel: LogLevel.DEBUG,
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
            signingSecret: process.env.SLACK_SIGNING_SECRET,
            headers: req.headers,
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
        const server = createServer(app.client, installationStore, app.logger);
        const transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: undefined,
        });
        await server.connect(transport);
        await transport.handleRequest(req, res, body);
      },
    },
  ],
});

(async () => {
  const port = Number.parseInt(process.env.PORT || "3000", 10);
  await app.start(port);

  app.logger.info(`⚡ MCP Server (slack-identity) running on port ${port}`);
  app.logger.info(`   POST http://localhost:${port}/mcp`);
})();
