# Slackbot MCP Client

Connect MCP servers to Slackbot with different options for authentication.

Read the [docs](https://docs.slack.dev/ai/slackbot-mcp-client) to explore more concepts around MCP.

## Included examples

### Authentication methods

- **[Dynamic client registration](https://docs.slack.dev/ai/slackbot-mcp-client/dynamic-client-registration)**: Connect a remote MCP server with standard OAuth discovery. [Implementation](./dynamic-client-registration/).
- **[External auth](https://docs.slack.dev/ai/slackbot-mcp-client/external-auth)**: Connect a remote MCP server with manual OAuth provider configuration. [Implementation](./external-auth/).
- **[No auth](https://docs.slack.dev/ai/slackbot-mcp-client/no-auth)**: Run an MCP server that responds with an interactive UI without authentication. [Implementation](./no-auth/).
- **[Slack identity](https://docs.slack.dev/ai/slackbot-mcp-client/slack-identity)**: Run an MCP server that responds with Block Kit and authenticates with existing installations. [Implementation](./slack-identity/).
