import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the slackbot.skills.list method
const response = await client.slackbot.skills.list({
  category: "productivity",
  cursor: "dGVhbTpDMDYxRkE1UEI=",
  filter: "library",
  limit: 100,
});

// Inspect the response
console.log(response);
