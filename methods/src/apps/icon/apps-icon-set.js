import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the apps.icon.set method
const response = await client.apps.icon.set({
  app_id: "A0123456789",
  url: "https://example.com/icon.png",
});

// Inspect the response
console.log(response);
