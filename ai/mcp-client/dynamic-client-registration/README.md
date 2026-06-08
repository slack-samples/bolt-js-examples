# MCP Server: Dynamic Client Registration

Demonstrates connecting an external MCP server (Notion) using Dynamic Client Registration (DCR). Slack automatically handles OAuth client registration with the remote server — no client ID or secret management needed.

## How it works

1. You declare the MCP server with `"auth_type": "dynamic_client_registration"`
2. Slack automatically registers as an OAuth client with the remote server
3. Users authorize via an in-product flow when they first connect
4. Slackbot calls the remote MCP server with per-user tokens

No app code is needed — Notion hosts the MCP server. This manifest is all you need.

## Setup

1. Create a new app at [api.slack.com/apps](https://api.slack.com/apps) using `manifest.json`
2. Install the app to your workspace
3. Open Slackbot and connect the Notion MCP server

## Try it

Ask Slackbot: _"Search my Notion for meeting notes"_

## Manifest

```json
"mcp_servers": {
  "notion": {
    "url": "https://mcp.notion.com/mcp",
    "auth_type": "dynamic_client_registration"
  }
}
```

The `auth_type: "dynamic_client_registration"` tells Slack to handle OAuth registration automatically with the remote server.
