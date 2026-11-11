import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the admin.slackbot.skills.setAutoEnabled method
const response = await client.admin.slackbot.skills.setAutoEnabled({
  permission_type: "named_entities",
  skill_id: "F0123ABCD",
  usergroup_ids: ["S0123ABCD"],
});

// Inspect the response
console.log(response);
