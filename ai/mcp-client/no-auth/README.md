# No Auth

Run an MCP server that connects to Slackbot and responds with an [interactive UI](https://modelcontextprotocol.io/extensions/apps/overview).

## Setup

```sh
$ ngrok http 3000  # Update manifest with these values
$ slack manifest   # Review values
$ slack install --environment local  # Create a new app
$ slack app settings
$ slack env set SLACK_SIGNING_SECRET placeholder
$ slack run
```

Ask Slackbot: "Roll 2d20"
