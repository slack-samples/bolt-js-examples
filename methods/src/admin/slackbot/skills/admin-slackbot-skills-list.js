import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the admin.slackbot.skills.list method
const response = await client.admin.slackbot.skills.list({
  auto_enabled_status: "all",
  category: "productivity",
  creator_ids: ["U0123ABCD"],
  cursor: "dGVhbTpDMDYxRkE1UEI=",
  limit: 100,
  publish_status: "all",
  sort: "name",
  sort_dir: "asc",
});

// Inspect the response
console.log(response);
