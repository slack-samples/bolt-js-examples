import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the admin.slackbot.skills.publish method
const response = await client.admin.slackbot.skills.publish({
  skill_ids: ["F0123ABCD"],
});

// Inspect the response
console.log(response);
