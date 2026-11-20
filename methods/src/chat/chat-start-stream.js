import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the chat.startStream method
const response = await client.chat.startStream({
  channel: "C123ABC456",
  markdown_text: "**This is bold text**",
  thread_ts: "1721609600.123456",
  recipient_user_id: "U0123456789",
  recipient_team_id: "T0123456789",
});

// Inspect the response
console.log(response);
