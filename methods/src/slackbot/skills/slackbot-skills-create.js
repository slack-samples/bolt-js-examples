import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the slackbot.skills.create method
const response = await client.slackbot.skills.create({
  display_name: "Daily priorities",
  instructions:
    "# Purpose\nSuggest the three most important things to work on today.",
  description:
    "Reviews information from Slack and your calendar to suggest priorities for the day.",
  category: "productivity",
  example_prompt: "Run {skill} for today",
  mcp_servers: [
    {
      service_type: "app",
      app_id: "A0123ABCD",
      server_id: "Amcp0456EFGH",
    },
  ],
});

// Inspect the response
console.log(response);
