# MCP Client

Surface tools of an MCP server to the Slackbot MCP client.

Read the [docs](https://docs.slack.dev/ai/slack-mcp-client) to explore more concepts around MCP.

## Included examples

### Authentication methods

- **[Dynamic client registration](./dynamic-client-registration)**: Connect a remote MCP server with standard OAuth discovery. [Implementation](./dynamic-client-registration/manifest.json).
- **[External auth](./external-auth)**: Connect a remote MCP server with manual OAuth provider configuration. [Implementation](./external-auth/manifest.json).
- **[No auth](./no-auth)**: Perform tool calls with minimal verification of incoming requests. [Implementation](./no-auth/app.js).
- **[Slack identity](./slack-identity)**: Perform tool calls using Slack identity auth and an OAuth install flow. [Implementation](./slack-identity/app.js).
