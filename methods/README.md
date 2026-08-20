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

- **[agents.sessions.rename](https://docs.slack.dev/reference/methods/agents.sessions.rename)**: Rename an agent session. [Implementation](./src/agents/sessions/agents-sessions-rename.js).
- **[agents.sessions.setStatus](https://docs.slack.dev/reference/methods/agents.sessions.setStatus)**: Set an agent session's lifecycle status, creating the session if needed. [Implementation](./src/agents/sessions/agents-sessions-set-status.js).

### chat

- **[chat.postMessage](https://docs.slack.dev/reference/methods/chat.postmessage)**: Sends a message to a channel. [Implementation](./src/chat/chat-post-message.js).
