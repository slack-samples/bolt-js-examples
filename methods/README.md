# Methods

Examples of calling individual [Slack Web API methods](https://docs.slack.dev/reference/methods) with [`@slack/web-api`](https://www.npmjs.com/package/@slack/web-api).

Each example is a complete, runnable Node script. Set the appropriate token in your environment and run it directly:

    export SLACK_TOKEN="xoxb-your-token"
    node chat/src/chat-post-message.js

Examples are grouped by method family. Each family documents the OAuth scopes its methods require, so you only grant what you need.

## What's on display

### blocks

- **[blocks.validate](https://docs.slack.dev/reference/methods/blocks.validate)**: Validates Block Kit JSON payloads. [Implementation](./blocks/src/blocks-validate.js). Scopes: none.

### chat

- **[chat.postMessage](https://docs.slack.dev/reference/methods/chat.postmessage)**: Sends a message to a channel. [Implementation](./chat/src/chat-post-message.js). Scopes: `chat:write`.
