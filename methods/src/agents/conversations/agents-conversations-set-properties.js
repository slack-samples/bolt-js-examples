import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.conversations.setProperties method
const response = await client.agents.conversations.setProperties({
  channel_id: "C123ABC456",
  code_channel: {
    context_bar_items: [
      {
        key: "repo",
        label: "acme/billing",
        icon: "folder",
        url: "https://github.com/acme/billing",
      },
    ],
  },
});

// Inspect the response
console.log(response);
