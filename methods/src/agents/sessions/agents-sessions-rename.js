import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.sessions.rename method
const response = await client.agents.sessions.rename({
  channel_id: "C123ABC456",
  title: "Fix flaky login test",
});

// Inspect the response
console.log(response);
