# MCP Server: Slack Identity Auth

Demonstrates Slack identity-based authentication for MCP servers. Exposes a `search_notes` tool that returns personal and team notes scoped to the requesting user.

Slack sends signed requests with `user_id` and `team_id` in `_meta.slack`. Your server verifies the signature and uses the identity to scope results — no separate OAuth flow needed.

## How it works

1. Your app declares an MCP server with `"auth_type": "slack_identity_auth"`
2. Slackbot sends requests signed with your app's signing secret
3. The server verifies the signature, reads `user_id`/`team_id` from the request
4. Notes are looked up from `notes/TEAMID-USERID.md` (personal) and `notes/TEAMID.md` (shared)

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

### Add your notes

Create notes files using your real team and user IDs:

```bash
cp notes/T0000000000-U0123456789.md notes/YOUR_TEAM_ID-YOUR_USER_ID.md
cp notes/T0000000000.md notes/YOUR_TEAM_ID.md
```

## Try it

Ask Slackbot: _"What are my current projects?"_

## Manifest

```json
"mcp_servers": {
  "notes": {
    "url": "https://YOUR_URL/mcp",
    "auth_type": "slack_identity_auth"
  }
}
```

The `auth_type: "slack_identity_auth"` tells Slack to send signed requests with user context.
