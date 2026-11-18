import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.conversations.setProperties method
const response = await client.agents.conversations.setProperties({
  channel_id: "C9876543210",
  code_channel: {
    context_bar_items: [
      {
        key: "repo",
        label: "borant/billing",
        icon: "folder",
        url: "https://github.com/borant/billing",
      },
      {
        key: "branch",
        label: "agent/migrate-cron",
        icon: "branch",
        url: "https://github.com/borant/billing/tree/agent/migrate-cron",
      },
      {
        key: "pr",
        label: "PR #42 is open",
        icon: "hierarchy",
        url: "https://github.com/borant/billing/pull/42",
      },
      {
        key: "ci",
        label: "Tests pending",
        icon: "terminal",
      },
    ],
  },
});

// Inspect the response
console.log(response);
