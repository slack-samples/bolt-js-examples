import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the admin.apps.mcp.servers.permissions.set method
const response = await client.admin.apps.mcp.servers.permissions.set({
  app_id: "A0000000001",
  server_id: "Amcp0000000001",
  permission_type: "named_entities",
  user_ids: ["U00000001", "U00000002"],
  usergroup_ids: ["S00000001", "S00000002"],
});

// Inspect the response
console.log(response);
