# MCP Client Examples - Handoff

## What This Is

Four examples showing how to connect MCP servers to Slackbot, one per auth type. Located at `ai/mcp-client/[auth-type]/`.

## Examples

| Directory | Auth Type | What It Does | Has Code? |
|-----------|-----------|--------------|-----------|
| `no-auth/` | None | Fetches public Slack docs (`read_docs` tool) | Yes - `app.js` |
| `slack-identity/` | `slack_identity_auth` | Searches per-user notes (`search_notes` tool) | Yes - `app.js` |
| `dynamic-client-registration/` | `dynamic_client_registration` | Connects Notion MCP (remote server) | Manifest only |
| `external-auth/` | `manual_auth` | Connects GitHub Copilot MCP via OAuth | Manifest only |

## Architecture (for runnable examples)

Both `no-auth` and `slack-identity` use the same pattern:

- **Bolt for JavaScript** in HTTP mode (not socket mode)
- `customRoutes` to mount `POST /mcp`
- `@modelcontextprotocol/sdk` with `StreamableHTTPServerTransport` (stateless, `sessionIdGenerator: undefined`)
- Fresh `McpServer` instance per request
- `slack run` injects `SLACK_BOT_TOKEN` and `SLACK_SIGNING_SECRET`
- **ngrok** required for Slackbot to reach the local server

### slack-identity differences

- Verifies `X-Slack-Signature` using `isValidSlackRequest` from `@slack/bolt`
- Reads `_meta.slack.user_id` and `_meta.slack.team_id` from MCP request context
- Notes stored in `notes/{teamId}-{userId}.md`

## Running

```bash
cd ai/mcp-client/no-auth
npm install
ngrok http 3000          # Update manifest.json with the ngrok URL
slack run
```

## Manifest Key Points

- `"mcp:connect"` bot scope is required for all
- `mcp_servers` block declares the server URL and auth type
- `socket_mode_enabled: false` — MCP needs HTTP
- For `external-auth`: requires `external_auth_providers` block with OAuth config

## Current State

- PR: https://github.com/slack-samples/bolt-js-examples/pull/83
- `no-auth` and `slack-identity` both compile/run but haven't been end-to-end tested with Slackbot yet
- The no-auth app's manifest has a hardcoded ngrok URL that needs updating each session
- `slack-identity` has a sample notes file for team `T02A074M3U3` / user `U04051AF9NJ`

## TODO

- [ ] End-to-end test: ask Slackbot a question and confirm it calls the MCP tool
- [ ] Add `.env.sample` files to each runnable example
- [ ] Add `package.json` to `slack-identity/`
- [ ] Add READMEs to `slack-identity/`, `dynamic-client-registration/`, `external-auth/`
- [ ] Remove hardcoded ngrok URL from `no-auth/manifest.json` (use placeholder)
