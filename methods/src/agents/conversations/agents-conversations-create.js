import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.conversations.create method
const response = await client.agents.conversations.create({
  name: "Fix flaky login test",
  origin_channel_id: "C123ABC456",
  origin_message_ts: "1717171717.123456",
});

// Inspect the response
console.log(response);
