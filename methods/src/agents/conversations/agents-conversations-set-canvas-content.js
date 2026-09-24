import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.conversations.setCanvasContent method
const response = await client.agents.conversations.setCanvasContent({
  channel: "C123ABC456",
  canvas_id: "F123ABC456",
  content: "# Plan\n\n1. Reproduce the flaky test\n2. Fix the race\n3. Verify",
});

// Inspect the response
console.log(response);
