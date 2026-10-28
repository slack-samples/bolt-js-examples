import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the canvases.create method
const response = await client.canvases.create({
  title: "Your Brilliant Title",
  document_content: {
    type: "markdown",
    markdown: "> standalone canvas!",
  },
});

// Inspect the response
console.log(response);
