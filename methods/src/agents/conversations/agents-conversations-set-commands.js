import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.conversations.setCommands method
const response = await client.agents.conversations.setCommands({
  channel_id: "C9876543210",
  commands: [
    {
      name: "create-pr",
      description: "Open a pull request for the current branch",
      argument_hint: "[title]",
    },
    {
      name: "run-tests",
      description: "Run the test suite and report back",
    },
    {
      name: "summarize",
      description: "Post a summary of the work so far",
    },
  ],
});

// Inspect the response
console.log(response);
