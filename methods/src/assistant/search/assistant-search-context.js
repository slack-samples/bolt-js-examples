import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the assistant.search.context method
const response = await client.assistant.search.context({
  query: "What is the latest on project Gizmo?",
  term_clauses: ["project gizmo"],
  action_token: "12345.98765.abcd2358fdea",
  channel_types: ["public_channel", "private_channel", "mpim", "im"],
  content_types: ["messages", "files", "channels"],
  include_context_messages: true,
  include_bots: false,
  sort: "timestamp",
  sort_dir: "asc",
  before: 1755191113,
  after: 1752512713,
  include_message_blocks: true,
});

// Inspect the response
console.log(response);
