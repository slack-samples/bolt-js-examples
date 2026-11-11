import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the slackbot.skills.create method
const response = await client.slackbot.skills.create({
  category: "productivity",
  description:
    "Reviews information from Slack and your calendar to suggest priorities for the day.",
  display_name: "Daily priorities",
  example_prompt: "Run {skill} for today",
  instructions:
    "# Purpose\nSuggest the three most important things to work on today.",
  mcp_servers: [
    {
      app_id: "A0123ABCD",
      server_id: "Amcp0456EFGH",
      service_type: "app",
    },
  ],
});

// Inspect the response
console.log(response);
