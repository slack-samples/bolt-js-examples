# chat

Send and manage messages.

Read the [docs](https://docs.slack.dev/reference/methods#chat) to explore more methods in the `chat` family.

## What's on display

- **[chat.postMessage](https://docs.slack.dev/reference/methods/chat.postmessage)**: Sends a message to a channel. [Implementation](./src/chat-post-message.js).

## Running an example

This family is a self-contained Slack CLI app whose [`manifest.json`](./manifest.json) requests only the scopes it needs (`chat:write`). From this directory, install the app and grab a bot token:

```sh
slack install
```

Then set the token and run the example directly:

```sh
export SLACK_TOKEN="xoxb-your-token"
node src/chat-post-message.js
```
