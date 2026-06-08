# MCP Client Examples

Slack's MCP Client allows you to connect your MCP servers to Slackbot through the standard Slack App framework. These examples demonstrate all 4 authentication types.

Read the [docs](https://docs.slack.dev/ai/slack-mcp-server) to learn more about integrating MCP servers with Slack.

## Examples

| Example | Auth Type | Description |
|---------|-----------|-------------|
| [no-auth](./no-auth) | No auth | Simplest setup. Public data, no credentials needed. |
| [slack-identity](./slack-identity) | Slack Identity | Slack signs requests with user context. No separate OAuth. |
| [dynamic-client-registration](./dynamic-client-registration) | DCR | Slack auto-registers as an OAuth client (e.g., Notion). |
| [external-auth](./external-auth) | External Auth Provider | Manual OAuth setup with a third-party (e.g., GitHub). |

## How it works

1. You provide a remote MCP server (Streamable HTTP transport)
2. You declare it in your Slack app manifest with `mcp:connect` scope
3. Slackbot discovers your tools and invokes them based on user prompts

No custom Slack bot logic is needed. Slackbot is the AI layer — your MCP server provides the tools.
