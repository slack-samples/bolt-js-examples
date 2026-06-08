# MCP Server: External Auth Provider

Demonstrates connecting an external MCP server (GitHub) using a manually configured OAuth provider. You register your own OAuth credentials and Slack brokers the per-user authorization flow.

## How it works

1. You create a GitHub OAuth App and get a client ID + secret
2. Define the OAuth provider in `external_auth_providers` in your manifest
3. Reference it via `auth_provider_key` in your `mcp_servers` config
4. Users authorize with GitHub when they first connect in Slackbot
5. Slack stores per-user tokens and passes them to the MCP server

No app code is needed — GitHub hosts the MCP server. This manifest is all you need.

## Setup

1. Create a GitHub OAuth App at [github.com/settings/developers](https://github.com/settings/developers)
   - Set the callback URL to: `https://oauth2.slack.com/external/auth/callback`
2. Replace `YOUR_GITHUB_CLIENT_ID` in `manifest.json`
3. Create a new app at [api.slack.com/apps](https://api.slack.com/apps) using the manifest
4. Add the client secret via the **External MCP Servers** section in the App Config UI
5. Install the app to your workspace

## Try it

Ask Slackbot: _"Show me my recent GitHub pull requests"_

## Manifest

```json
"external_auth_providers": {
  "oauth2": {
    "github": {
      "provider_type": "CUSTOM",
      "options": {
        "client_id": "YOUR_GITHUB_CLIENT_ID",
        "authorization_url": "https://github.com/login/oauth/authorize",
        "token_url": "https://github.com/login/oauth/access_token",
        "identity_config": {
          "url": "https://api.github.com/user",
          "account_identifier": "$.login"
        }
      }
    }
  }
},
"mcp_servers": {
  "github": {
    "url": "https://api.githubcopilot.com/mcp/",
    "auth_provider_key": "github"
  }
}
```

The `auth_provider_key` links the MCP server to the OAuth provider defined in `external_auth_providers`.
