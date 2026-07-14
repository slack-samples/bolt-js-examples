# blocks

Methods for validating Block Kit payloads.

## Required scopes

| Method | Token type | Scopes |
| --- | --- | --- |
| [`blocks.validate`](https://docs.slack.dev/reference/methods/blocks.validate) | Any | None |

> **Note:** `blocks.validate` is not yet a typed method in `@slack/web-api`, so the
> example uses the generic `client.apiCall(...)` escape hatch instead of a typed
> `client.blocks.validate(...)` call.

## Examples

- **[blocks-validate.js](./src/blocks-validate.js)** — validates a Block Kit payload with `blocks.validate`.

Set a token and run:

    export SLACK_TOKEN="xoxb-your-token"
    node blocks/src/blocks-validate.js
