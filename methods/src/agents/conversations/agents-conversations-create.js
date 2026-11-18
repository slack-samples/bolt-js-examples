import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.conversations.create method
const response = await client.agents.conversations.create({
  name: "Migrate billing cron to Temporal",
  session_id: "ses_8675309",
  origin_channel_id: "C0123456789",
  origin_message_ts: "1717171717.123456",
});

// Inspect the response
console.log(response);
