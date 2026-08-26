import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the chat.startStream method
const response = await client.chat.startStream({
  channel: "C123ABC456",
  thread_ts: "1234567890.123456",
  markdown_text: "Let me look into that",
});

// Inspect the response
console.log(response);
