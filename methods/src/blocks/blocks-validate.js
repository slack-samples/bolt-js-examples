import { WebClient } from "@slack/web-api";

// Initialize
const client = new WebClient();

// Call the blocks.validate method
const response = await client.blocks.validate({
  blocks: [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "Hello world",
      },
    },
  ],
});

// Inspect the response
console.log(response);
