import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the entity.acknowledgeCommentAction method
const response = await client.entity.acknowledgeCommentAction({
  trigger_id: "1234567890123.1234567890123.abcdef01234567890abcdef012345689",
  comment: {
    id: "comment-unique-id-003",
    sender: {
      user_id: "U123456789",
    },
    comment: {
      value: "The saved comment text",
      format: "markdown",
    },
    timestamp: 1741164500,
    url: "your.app/item/1/comment/3",
    thread_root_id: "comment-unique-id-001",
  },
});

// Inspect the response
console.log(response);
