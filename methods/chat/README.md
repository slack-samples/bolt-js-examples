# chat

Send and manage messages.

Read the [docs](https://docs.slack.dev/reference/methods#chat) to explore more methods in the `chat` family.

## What's on display

- **[chat.postMessage](https://docs.slack.dev/reference/methods/chat.postmessage)**: Sends a message to a channel. [Implementation](./src/chat-post-message.js). Scopes: `chat:write`.

## Running an example

Set a bot token and run the script directly:

```sh
export SLACK_TOKEN="xoxb-your-token"
node chat/src/chat-post-message.js
```
