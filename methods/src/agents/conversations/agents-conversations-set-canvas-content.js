import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.conversations.setCanvasContent method
const response = await client.agents.conversations.setCanvasContent({
  channel: "C9876543210",
  canvas_id: "F1234567890",
  content: "# Migration plan\n\n1. Inventory cron jobs\n2. Port billing jobs last\n",
});

// Inspect the response
console.log(response);
