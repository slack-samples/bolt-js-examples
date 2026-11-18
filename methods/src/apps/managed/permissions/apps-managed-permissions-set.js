import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the apps.managed.permissions.set method
const response = await client.apps.managed.permissions.set({
  app_id: "A0123456789",
  permissions: "everyone",
});

// Inspect the response
console.log(response);
