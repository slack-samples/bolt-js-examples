import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { App, isValidSlackRequest, LogLevel } from "@slack/bolt";
import { FileInstallationStore } from "@slack/oauth";
import { z } from "zod";

/**
 * @typedef {object} SlackIdentity
 * @property {string} [user_id]
 * @property {string} [team_id]
 * @property {string} [enterprise_id]
 */

/**
 * Creates an MCP server with a Slack profile card tool that returns Block Kit.
 * @param {import("@slack/web-api").WebClient} client - Slack Web API client
 * @param {import("@slack/oauth").InstallationStore} installationStore - OAuth installation store
 * @param {import("@slack/bolt").Logger} logger - Bolt logger instance
 * @see {@link https://github.com/modelcontextprotocol/typescript-sdk#getting-started}
 */
function createServer(client, installationStore, logger) {
  const server = new McpServer({ name: "Profile Card", version: "1.0.0" });

  server.registerTool(
    "get_profile_card",
    {
      title: "Get Profile Card",
      description: "Get a profile card for a Slack user by their user ID.",
      inputSchema: {
        user_id: z
          .string()
          .describe("The Slack user ID to look up (e.g. U01234ABCDE)"),
      },
      annotations: {
        readOnlyHint: true,
      },
      _meta: {
        slack: {
          supportsBlockKit: true,
        },
      },
    },
    async ({ user_id }, { _meta }) => {
      /** @type {SlackIdentity | undefined} */
      const slack = /** @type {any} */ (_meta?.slack);

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
          enterpriseId: slack.enterprise_id || undefined,
          isEnterpriseInstall: !!slack.enterprise_id,
        });
        if (!installation.bot?.token) {
          throw new Error("No bot token found for this installation");
        }
        botToken = installation.bot.token;
      } catch (err) {
        logger.error(err);
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

      let user;
      let profile;
      try {
        const result = await client.users.info({
          token: botToken,
          user: user_id,
        });
        if (!result.user?.profile) {
          throw new Error(`User ${user_id} not found.`);
        }
        user = result.user;
        profile = result.user.profile;
      } catch (err) {
        logger.error(err);
        return {
          content: [
            {
              type: "text",
              text: `Failed to fetch profile for ${user_id}.`,
            },
          ],
        };
      }

      const name = profile.real_name_normalized || user.name;
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
            text: `Profile card for ${name}`,
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
                      alt_text: name,
                    }
                  : undefined,
                title: {
                  type: "mrkdwn",
                  text: name,
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

/**
 * Bolt app with OAuth install flow and custom /mcp route.
 * @see {@link https://docs.slack.dev/tools/bolt-js/getting-started}
 */
const installationStore = new FileInstallationStore({
  baseDir: "./installations/",
});

export const app = new App({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  stateSecret: process.env.SLACK_STATE_SECRET,
  scopes: ["mcp:connect", "users:read", "users:read.email"],
  installationStore,
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
