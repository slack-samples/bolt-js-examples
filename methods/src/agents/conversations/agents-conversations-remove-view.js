import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.conversations.removeView method
const response = await client.agents.conversations.removeView({
  channel_id: "C9876543210",
  view_key: "reports/coverage.html",
});

// Inspect the response
console.log(response);
