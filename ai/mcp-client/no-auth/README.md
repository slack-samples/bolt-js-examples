# MCP Server: No Auth

The simplest MCP server example. Exposes a `read_docs` tool that fetches public Slack developer documentation. No authentication required — Slackbot calls the endpoint directly.

## How it works

1. Your app declares an MCP server in `manifest.json` with no auth configuration
2. Slackbot connects to `POST /mcp` and discovers available tools
3. Users ask Slackbot questions, it calls `read_docs` to fetch documentation

## Setup

```bash
npm install
ngrok http 3000
```

Update `manifest.json` with your ngrok URL, create the app at [api.slack.com/apps](https://api.slack.com/apps), then:

```bash
cp .env.sample .env
# Fill in SLACK_SIGNING_SECRET, SLACK_CLIENT_ID, SLACK_CLIENT_SECRET
npm start
```

## Try it

Ask Slackbot: _"What Slack APIs are available?"_

## Manifest

```json
"mcp_servers": {
  "docs": {
    "url": "https://YOUR_URL/mcp"
  }
}
```

No `auth_type` or `auth_provider_key` — this is the default (no auth).
