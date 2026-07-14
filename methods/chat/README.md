# chat

Methods for sending and managing messages.

## Required scopes

| Method | Token type | Scopes |
| --- | --- | --- |
| [`chat.postMessage`](https://docs.slack.dev/reference/methods/chat.postmessage) | Bot | `chat:write` |

## Examples

- **[chat-post-message.js](./src/chat-post-message.js)** — posts a message to a channel with `chat.postMessage`.

Set a bot token and run:

    export SLACK_TOKEN="xoxb-your-token"
    node chat/src/chat-post-message.js
