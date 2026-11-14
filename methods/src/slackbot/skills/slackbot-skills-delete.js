import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the slackbot.skills.delete method
const response = await client.slackbot.skills.delete({
  skill_id: "F0123ABCD",
});

// Inspect the response
console.log(response);
