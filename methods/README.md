# Methods

An interface for querying information from and enacting change in a Slack workspace.

Read the [docs](https://docs.slack.dev/apis/web-api/) for explanations of concepts, or explore [reference](https://docs.slack.dev/reference/methods) pages for specific functionalities.

## Making a request

```sh
$ cd src/chat  # Navigate to a method family
$ slack install --environment local  # Create an app
$ vim chat-post-message.js  # Edit arguments
$ export SLACK_TOKEN=xoxb-example  # Set if unchanged
$ slack run chat-post-message.js  # Make the request
```

## What's on call

### agents

- **[agents.conversations.archive](https://docs.slack.dev/reference/methods/agents.conversations.archive)**: Archives a code channel, optionally recording a summary message on the channel. [Implementation](./src/agents/conversations/agents-conversations-archive.js).
- **[agents.conversations.create](https://docs.slack.dev/reference/methods/agents.conversations.create)**: Creates a dedicated code channel for an agent session. [Implementation](./src/agents/conversations/agents-conversations-create.js).
- **[agents.conversations.getCanvas](https://docs.slack.dev/reference/methods/agents.conversations.getCanvas)**: Fetches a canvas attached to a code channel — full content plus comment threads — in a single round-trip. [Implementation](./src/agents/conversations/agents-conversations-get-canvas.js).
- **[agents.conversations.listViews](https://docs.slack.dev/reference/methods/agents.conversations.listViews)**: Lists the view tabs attached to a code channel. [Implementation](./src/agents/conversations/agents-conversations-list-views.js).
- **[agents.conversations.removeView](https://docs.slack.dev/reference/methods/agents.conversations.removeView)**: Removes a view from a code channel. [Implementation](./src/agents/conversations/agents-conversations-remove-view.js).
- **[agents.conversations.setCanvasContent](https://docs.slack.dev/reference/methods/agents.conversations.setCanvasContent)**: Replaces the full markdown content of a canvas attached to a code channel, preserving the comment threads on the sections your agent didn't change. [Implementation](./src/agents/conversations/agents-conversations-set-canvas-content.js).
- **[agents.conversations.setCommands](https://docs.slack.dev/reference/methods/agents.conversations.setCommands)**: Registers the set of slash commands your agent offers in a code channel. [Implementation](./src/agents/conversations/agents-conversations-set-commands.js).
- **[agents.conversations.setProperties](https://docs.slack.dev/reference/methods/agents.conversations.setProperties)**: Sets properties on a code channel: context bar items and external resource details. [Implementation](./src/agents/conversations/agents-conversations-set-properties.js).
- **[agents.conversations.setView](https://docs.slack.dev/reference/methods/agents.conversations.setView)**: Creates or updates a view in a code channel. Views can render HTML, diffs, Block Kit, or canvases as tabs alongside the conversation. [Implementation](./src/agents/conversations/agents-conversations-set-view.js).
- **[agents.sessions.rename](https://docs.slack.dev/reference/methods/agents.sessions.rename)**: Rename an agent session. [Implementation](./src/agents/sessions/agents-sessions-rename.js).
- **[agents.sessions.setStatus](https://docs.slack.dev/reference/methods/agents.sessions.setStatus)**: Set an agent session's lifecycle status, creating the session if needed. [Implementation](./src/agents/sessions/agents-sessions-set-status.js).

### blocks

- **[blocks.validate](https://docs.slack.dev/reference/methods/blocks.validate)**: Validates blocks, messages, and views Block Kit JSON payloads. [Implementation](./src/blocks/blocks-validate.js).

### chat

- **[chat.postMessage](https://docs.slack.dev/reference/methods/chat.postmessage)**: Sends a message to a channel. [Implementation](./src/chat/chat-post-message.js).
