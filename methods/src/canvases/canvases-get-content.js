import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the canvases.getContent method
const response = await client.canvases.getContent({
  canvas_id: "F1234ABCD",
  content_type: "markdown",
});

// Inspect the response
console.log(response);
