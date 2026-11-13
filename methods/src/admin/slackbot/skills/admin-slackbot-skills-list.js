import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the admin.slackbot.skills.list method
const response = await client.admin.slackbot.skills.list({
  category: "productivity",
  creator_ids: ["U0123ABCD"],
  publish_status: "published",
  auto_enabled_status: "enabled",
  sort: "usage_count",
  sort_dir: "desc",
});

// Inspect the response
console.log(response);
