import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the slackbot.skills.library.remove method
const response = await client.slackbot.skills.library.remove({
  skill_id: "F0123ABCD",
});

// Inspect the response
console.log(response);
