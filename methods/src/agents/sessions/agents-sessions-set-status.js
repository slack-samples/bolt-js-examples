import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.sessions.setStatus method
const response = await client.agents.sessions.setStatus({
  channel_id: "C123ABC456",
  status: "processing",
});

// Inspect the response
console.log(response);
