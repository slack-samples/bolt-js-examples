# Block Kit

Return native [Block Kit](https://docs.slack.dev/block-kit/) UI components from an MCP server tool response.

This example extends the [Slack identity](../../slack-identity/) example by adding `_meta.slack.blocks` to the tool response, rendering a profile card using the `card` block type.

Read the [docs](https://docs.slack.dev/ai/slackbot-mcp-client/returning-rich-responses#block-kit) to learn more about Block Kit responses from MCP servers.

## Setup

1. Copy `.env.example` to `.env` and fill in your Slack app credentials
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Expose via ngrok and update `manifest.json` with your URL

## Testing

```sh
npm test
```
