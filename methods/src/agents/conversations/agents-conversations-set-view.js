import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the agents.conversations.setView method
const response = await client.agents.conversations.setView({
  channel_id: "C9876543210",
  view_key: "reports/coverage.html",
  name: "Coverage",
  content: "<!doctype html><html><head>…</head><body>…</body></html>",
  csp: {
    resource_domains: ["https://cdn.jsdelivr.net"],
  },
});

// Inspect the response
console.log(response);
