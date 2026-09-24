import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.conversations.setCommands method
const response = await client.agents.conversations.setCommands({
  channel_id: "C123ABC456",
  commands: [
    {
      name: "test",
      description: "Run the test suite",
    },
    {
      name: "diff",
      description: "Show the current diff",
    },
  ],
});

// Inspect the response
console.log(response);
