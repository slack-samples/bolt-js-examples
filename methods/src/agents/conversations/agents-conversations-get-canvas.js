import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.conversations.getCanvas method
const response = await client.agents.conversations.getCanvas({
  channel: "C123ABC456",
  canvas_id: "F123ABC456",
});

// Inspect the response
console.log(response);
