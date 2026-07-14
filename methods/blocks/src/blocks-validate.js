import { WebClient } from "@slack/web-api";

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Validate a Block Kit payload with the blocks.validate method
const blocks = JSON.stringify([
  { type: "section", text: { type: "plain_text", text: "Hello world" } },
]);

// blocks.validate is not yet a typed method in @slack/web-api, so use the
// generic apiCall escape hatch instead of client.blocks.validate.
await client.apiCall("blocks.validate", { blocks });
