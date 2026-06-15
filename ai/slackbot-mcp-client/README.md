# Slackbot MCP Client

Connect MCP servers to Slackbot MCP client with different options for authentication.

Read the [docs](https://docs.slack.dev/ai/slack-mcp-client) to explore more concepts around MCP.

## Included examples

### Authentication methods

- **[Dynamic client registration](./dynamic-client-registration/)**: Connect a remote MCP server with standard OAuth discovery. [Implementation](./dynamic-client-registration/).
- **[External auth](./external-auth/)**: Connect a remote MCP server with manual OAuth provider configuration. [Implementation](./external-auth/).
- **[No auth](./no-auth/)**: Run an MCP server that responds with an interactive UI without authentication. [Implementation](./no-auth/).
- **[Slack identity](./slack-identity/)**: Run an MCP server that responds with Block Kit and authenticates with existing installations. [Implementation](./slack-identity/).
