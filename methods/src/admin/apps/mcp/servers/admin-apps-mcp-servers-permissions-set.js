import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the admin.apps.mcp.servers.permissions.set method
const response = await client.admin.apps.mcp.servers.permissions.set({
  app_id: "A0123ABCD",
  server_id: "Amcp0456EFGH",
  permission_type: "named_entities",
  user_ids: ["U0123ABCD"],
  usergroup_ids: ["S0123ABCD"],
});

// Inspect the response
console.log(response);
