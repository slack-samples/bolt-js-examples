import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the chat.stopStream method
const response = await client.chat.stopStream({
  channel: "C123ABC456",
  ts: "1234567890.123456",
});

// Inspect the response
console.log(response);
