import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.conversations.listViews method
const response = await client.agents.conversations.listViews({
  channel_id: "C123ABC456",
});

// Inspect the response
console.log(response);
