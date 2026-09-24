import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.conversations.setView method
const response = await client.agents.conversations.setView({
  channel_id: "C123ABC456",
  type: "diff",
  content:
    "diff --git a/cron.py b/cron.py\n--- a/cron.py\n+++ b/cron.py\n@@ ...",
  base_branch: "main",
  head_branch: "agent/migrate-cron",
});

// Inspect the response
console.log(response);
