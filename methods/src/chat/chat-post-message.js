import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the chat.postMessage method
const response = await client.chat.postMessage({
  channel: "C123ABC456",
  text: "Here's a message for you",
});

// Inspect the response
console.log(response);
