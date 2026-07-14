import { WebClient } from "@slack/web-api";

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the chat.postMessage method
await client.chat.postMessage({
  channel: "C123ABC456",
  text: "Here's a message for you",
});
