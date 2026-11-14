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

### admin

- **[admin.slackbot.skills.list](https://docs.slack.dev/reference/methods/admin.slackbot.skills.list)**: Lists metadata for skills owned by the organization, including invite-only skills. [Implementation](./src/admin/slackbot/skills/admin-slackbot-skills-list.js).
- **[admin.slackbot.skills.publish](https://docs.slack.dev/reference/methods/admin.slackbot.skills.publish)**: Publishes Slackbot skills to an organization's catalog. [Implementation](./src/admin/slackbot/skills/admin-slackbot-skills-publish.js).
- **[admin.slackbot.skills.setAutoEnabled](https://docs.slack.dev/reference/methods/admin.slackbot.skills.setAutoEnabled)**: Sets who a Slackbot skill is automatically turned on for. [Implementation](./src/admin/slackbot/skills/admin-slackbot-skills-set-auto-enabled.js).
- **[admin.slackbot.skills.unpublish](https://docs.slack.dev/reference/methods/admin.slackbot.skills.unpublish)**: Removes Slackbot skills from the org catalog, preserving access, libraries, and deployments. [Implementation](./src/admin/slackbot/skills/admin-slackbot-skills-unpublish.js).

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

### canvases

- **[canvases.create](https://docs.slack.dev/reference/methods/canvases.create)**: Create canvas for a user. [Implementation](./src/canvases/canvases-create.js).
- **[canvases.getContent](https://docs.slack.dev/reference/methods/canvases.getContent)**: Get the content of a canvas as markdown (default) or HTML. [Implementation](./src/canvases/canvases-get-content.js).

### chat

- **[chat.postMessage](https://docs.slack.dev/reference/methods/chat.postmessage)**: Sends a message to a channel. [Implementation](./src/chat/chat-post-message.js).

### slackbot

- **[slackbot.skills.create](https://docs.slack.dev/reference/methods/slackbot.skills.create)**: Creates a skill from markdown instructions, or turns an existing canvas the caller owns into a skill. [Implementation](./src/slackbot/skills/slackbot-skills-create.js).
- **[slackbot.skills.delete](https://docs.slack.dev/reference/methods/slackbot.skills.delete)**: Deletes a Slackbot skill and its canvas, and removes it from every library, skill set, and the org catalog. [Implementation](./src/slackbot/skills/slackbot-skills-delete.js).
- **[slackbot.skills.info](https://docs.slack.dev/reference/methods/slackbot.skills.info)**: Returns one Slackbot skill, including its instructions. [Implementation](./src/slackbot/skills/slackbot-skills-info.js).
- **[slackbot.skills.library.add](https://docs.slack.dev/reference/methods/slackbot.skills.library.add)**: Turns a skill on in the caller's personal library. [Implementation](./src/slackbot/skills/library/slackbot-skills-library-add.js).
- **[slackbot.skills.library.remove](https://docs.slack.dev/reference/methods/slackbot.skills.library.remove)**: Turns a skill off in the caller's personal library. [Implementation](./src/slackbot/skills/library/slackbot-skills-library-remove.js).
- **[slackbot.skills.list](https://docs.slack.dev/reference/methods/slackbot.skills.list)**: Lists Slackbot skills from the caller's point of view. Instructions are not included. [Implementation](./src/slackbot/skills/slackbot-skills-list.js).
- **[slackbot.skills.update](https://docs.slack.dev/reference/methods/slackbot.skills.update)**: Changes a Slackbot skill's instructions or metadata. Only the inputs you send are changed; a call that changes nothing succeeds without writing. [Implementation](./src/slackbot/skills/slackbot-skills-update.js).
