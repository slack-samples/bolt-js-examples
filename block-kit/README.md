# Block Kit

The framework of visual components arranged to create app layouts.

Read the [docs](https://docs.slack.dev/block-kit/) to learn concepts behind these constructions, or explore [reference](https://docs.slack.dev/reference/block-kit) pages for attribute details.

## What's on display

### Blocks

- **[Actions](https://docs.slack.dev/reference/block-kit/blocks/actions-block)**: Holds multiple interactive elements. [Implementation](./src/blocks/actions.js).
- **[Card](https://docs.slack.dev/reference/block-kit/blocks/card-block)**: Displays related content together with an optional image, title, body, and actions. [Implementation](./src/blocks/card.js).
- **[Context](https://docs.slack.dev/reference/block-kit/blocks/context-block)**: Provides contextual info, which can include both images and text. [Implementation](./src/blocks/context.js).
- **[Context actions](https://docs.slack.dev/reference/block-kit/blocks/context-actions-block)**: Displays actions as contextual info, which can include both feedback buttons and icon buttons. [Implementation](./src/blocks/context_actions.js).
- **[Divider](https://docs.slack.dev/reference/block-kit/blocks/divider-block)**: Visually separates pieces of info inside of a message. [Implementation](./src/blocks/divider.js).
- **[File](https://docs.slack.dev/reference/block-kit/blocks/file-block)**: Displays info about remote files. [Implementation](./src/blocks/file.js).
- **[Header](https://docs.slack.dev/reference/block-kit/blocks/header-block)**: Displays a larger-sized text. [Implementation](./src/blocks/header.js).
- **[Image](https://docs.slack.dev/reference/block-kit/blocks/image-block)**: Displays an image. [Implementation](./src/blocks/image.js).
- **[Input](https://docs.slack.dev/reference/block-kit/blocks/input-block)**: Collects information from users via elements. [Implementation](./src/blocks/input.js).
- **[Markdown](https://docs.slack.dev/reference/block-kit/blocks/markdown-block)**: Displays formatted markdown. [Implementation](./src/blocks/markdown.js).
- **[Plan](https://docs.slack.dev/reference/block-kit/blocks/plan-block)**: Displays a collection of related tasks. [Implementation](./src/blocks/plan.js).
- **[Rich text](https://docs.slack.dev/reference/block-kit/blocks/rich-text-block)**: Displays formatted, structured representation of text. [Implementation](./src/blocks/rich_text.js).
- **[Section](https://docs.slack.dev/reference/block-kit/blocks/section-block)**: Displays text, possibly alongside elements. [Implementation](./src/blocks/section.js).
- **[Task card](https://docs.slack.dev/reference/block-kit/blocks/task-card-block)**: Displays a single task, representing a single action. [Implementation](./src/blocks/task_card.js).
- **[Video](https://docs.slack.dev/reference/block-kit/blocks/video-block)**: Displays an embedded video player. [Implementation](./src/blocks/video.js).
