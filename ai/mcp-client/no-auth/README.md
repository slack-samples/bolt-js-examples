# MCP Server: Dice Roller (No Auth)

An interactive MCP server that rolls dice and renders the result in a custom UI via MCP Apps. Demonstrates how a tool can return a `resourceUri` to display an interactive HTML view in Slack.

## How it works

1. Your app declares an MCP server in `manifest.json` with no auth
2. Slackbot connects to `POST /mcp` and discovers the `roll_dice` tool
3. Users ask Slackbot to roll dice — it calls `roll_dice` with `sides` and `count`
4. The tool returns a `resourceUri` pointing to a UI resource (`roll.html`)
5. Slack fetches the HTML resource and renders it as an interactive block
6. The UI receives the roll result via `ontoolresult` and displays it with animation

## MCP Apps

MCP Apps let tools return rich interactive UIs instead of plain text. The server registers:

- A **tool** (`roll_dice`) with `_meta.ui.resourceUri` pointing to the UI
- A **resource** (`ui://dice-roller/roll.html`) that serves the HTML

The HTML uses the `@modelcontextprotocol/ext-apps` client SDK to receive tool results.

## Setup

```bash
npm install
ngrok http 3000
```

Update `manifest.json` with your ngrok URL, create the app at [api.slack.com/apps](https://api.slack.com/apps), then:

```bash
cp .env.example .env
# Fill in SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET
npm start
```

## Try it

Ask Slackbot: _"Roll 2d20"_

## Manifest

```json
"mcp_servers": {
  "dice": {
    "url": "https://YOUR_URL/mcp",
    "auth_type": "no_auth"
  }
}
```
