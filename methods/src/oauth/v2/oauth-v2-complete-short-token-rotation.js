import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the oauth.v2.completeShortTokenRotation method
const response = await client.oauth.v2.completeShortTokenRotation({
  client_id: "4123121235.9872358710",
  client_secret: "e1b9e11dfcd19c1982d5de12921e17e8c",
  token: "xoxp-12345-67890-1928471-abcdefg",
  new_token: "xoxp-12345-67890-1928471-qemwiiwglagjacakvqbvbfkmvbsvsuzn",
});

// Inspect the response
console.log(response);
