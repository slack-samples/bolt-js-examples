# MCP Server: Dice Roller (No Auth)

An interactive MCP server that rolls dice and returns Block Kit with a "Roll again" button. Demonstrates how interactive components can trigger MCP tool calls via the `tool:` action_id prefix.

## How it works

1. Your app declares an MCP server in `manifest.json` with no auth
2. Slackbot connects to `POST /mcp` and discovers the `roll_dice` tool
3. Users ask Slackbot to roll dice — it calls `roll_dice` with `sides` and `count`
4. The tool returns Block Kit blocks including a button with `action_id: "tool:roll_dice"`
5. When the user clicks "Roll again", Slack translates it into another `tools/call` request

## Interactive components

Buttons with `action_id` prefixed by `tool:` automatically trigger MCP tool calls:

```json
{
  "type": "button",
  "text": { "type": "plain_text", "text": "🎲 Roll again" },
  "action_id": "tool:roll_dice",
  "value": "{\"sides\":20,\"count\":2}"
}
```

Clicking this button sends a `tools/call` request with `name: "roll_dice"` and `arguments: {"sides": 20, "count": 2}`.

## Setup

```bash
npm install
ngrok http 3000
```

Update `manifest.json` with your ngrok URL, create the app at [api.slack.com/apps](https://api.slack.com/apps), then:

```bash
cp .env.sample .env
# Fill in SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET
npm start
```

## Try it

Ask Slackbot: _"Roll 2d20"_ — then click the "Roll again" button to re-roll.

## Manifest

```json
"mcp_servers": {
  "dice": {
    "url": "https://YOUR_URL/mcp",
    "auth_type": "no_auth"
  }
}
```
