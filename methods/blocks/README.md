# blocks

Validate Block Kit payloads.

Read the [docs](https://docs.slack.dev/reference/methods#blocks) to explore more methods in the `blocks` family.

## What's on display

- **[blocks.validate](https://docs.slack.dev/reference/methods/blocks.validate)**: Validates Block Kit JSON payloads. [Implementation](./src/blocks-validate.js). Scopes: none.

`blocks.validate` is not yet a typed method in `@slack/web-api`, so the example uses the generic `client.apiCall(...)` escape hatch instead of a typed `client.blocks.validate(...)` call.

## Running an example

Set a token and run the script directly:

```sh
export SLACK_TOKEN="xoxb-your-token"
node blocks/src/blocks-validate.js
```
