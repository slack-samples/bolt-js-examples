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

- **[agents.conversations.archive](https://docs.slack.dev/reference/methods/agents.conversations.archive)**: Archive a code channel. [Implementation](./src/agents/conversations/agents-conversations-archive.js).
- **[agents.conversations.create](https://docs.slack.dev/reference/methods/agents.conversations.create)**: Create a dedicated code channel for an agent session. [Implementation](./src/agents/conversations/agents-conversations-create.js).
- **[agents.conversations.getCanvas](https://docs.slack.dev/reference/methods/agents.conversations.getCanvas)**: Fetch a canvas attached to a code channel. [Implementation](./src/agents/conversations/agents-conversations-get-canvas.js).
- **[agents.conversations.listViews](https://docs.slack.dev/reference/methods/agents.conversations.listViews)**: List the views currently attached to a code channel. [Implementation](./src/agents/conversations/agents-conversations-list-views.js).
- **[agents.conversations.removeView](https://docs.slack.dev/reference/methods/agents.conversations.removeView)**: Remove a view from a code channel. [Implementation](./src/agents/conversations/agents-conversations-remove-view.js).
- **[agents.conversations.setCanvasContent](https://docs.slack.dev/reference/methods/agents.conversations.setCanvasContent)**: Replace the full markdown content of a plan canvas attached to a code channel. [Implementation](./src/agents/conversations/agents-conversations-set-canvas-content.js).
- **[agents.conversations.setCommands](https://docs.slack.dev/reference/methods/agents.conversations.setCommands)**: Register the set of agent-defined slash commands for the calling agent in a code channel. [Implementation](./src/agents/conversations/agents-conversations-set-commands.js).
- **[agents.conversations.setProperties](https://docs.slack.dev/reference/methods/agents.conversations.setProperties)**: Set properties on a code channel. [Implementation](./src/agents/conversations/agents-conversations-set-properties.js).
- **[agents.conversations.setView](https://docs.slack.dev/reference/methods/agents.conversations.setView)**: Create or update a view in a code channel. [Implementation](./src/agents/conversations/agents-conversations-set-view.js).
- **[agents.sessions.rename](https://docs.slack.dev/reference/methods/agents.sessions.rename)**: Rename an agent session. [Implementation](./src/agents/sessions/agents-sessions-rename.js).
- **[agents.sessions.setStatus](https://docs.slack.dev/reference/methods/agents.sessions.setStatus)**: Set an agent session's lifecycle status, creating the session if needed. [Implementation](./src/agents/sessions/agents-sessions-set-status.js).

### blocks

- **[blocks.validate](https://docs.slack.dev/reference/methods/blocks.validate)**: Validates blocks, messages, and views Block Kit JSON payloads. [Implementation](./src/blocks/blocks-validate.js).

### chat

- **[chat.postMessage](https://docs.slack.dev/reference/methods/chat.postmessage)**: Sends a message to a channel. [Implementation](./src/chat/chat-post-message.js).
