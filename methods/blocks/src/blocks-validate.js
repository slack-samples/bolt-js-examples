import { WebClient } from "@slack/web-api";

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the blocks.validate method
await client.apiCall("blocks.validate", {
  blocks: JSON.stringify([
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "Hello world",
      },
    },
  ]),
});
