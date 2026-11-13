import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the admin.apps.mcp.servers.permissions.list method
const response = await client.admin.apps.mcp.servers.permissions.list({
  app_id: "A0000000001",
});

// Inspect the response
console.log(response);
