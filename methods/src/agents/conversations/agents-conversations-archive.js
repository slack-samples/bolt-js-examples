import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.conversations.archive method
const response = await client.agents.conversations.archive({
  channel_id: "C9876543210",
  summary_message_ts: "1717182000.456789",
});

// Inspect the response
console.log(response);
