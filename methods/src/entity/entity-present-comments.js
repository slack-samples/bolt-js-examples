import { WebClient } from "@slack/web-api";

// Read a token from an environment variable
const token = process.env.SLACK_TOKEN;

// Initialize
const client = new WebClient(token);

// Call the entity.presentComments method
const response = await client.entity.presentComments({
  comments: [
    // comment from an authenticated Slack user
    {
      sender: {
        user_id: "U123456789",
      },
      timestamp: 1741164235,
      id: "comment-unique-id-001",
      url: "your.app/item/1/comment/1",
      can_edit: true,
      can_delete: true,
      can_reply: true,
      reply_count: 2,
      reply_users: [
        {
          user_id: "U234567890",
        },
        {
          text: "External User",
          icon: {
            alt_text: "Summary of image's content",
            url: "...",
          },
        },
      ],
      latest_reply_ts: 1741165000,
      last_edit_ts: 1741164300,
      // comment with blocks
      comment: {
        blocks: {
          type: "rich_text",
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Check out these different block types with paragraph breaks between them:\n\n",
                },
              ],
            },
          ],
        },
      },
    },
    // example comment from a user who is not an authenticated Slack user
    {
      sender: {
        text: "UserFirstName UserLastName",
        icon: {
          alt_text: "Summary of image's content",
          url: "...", // publicly-accessible URL to an image
        },
        url: "your.app/user/userId",
        email: "firstname.lastname@domain.com",
      },
      timestamp: 1741164358,
      id: "comment-unique-id-002",
      url: "your.app/item/1/comment/2",
      thread_root_id: "comment-unique-id-001", // this is a reply to comment-001
      // comment with plain text
      comment: {
        value: "Plain text comment",
        format: "markdown",
      },
    },
  ],
  can_post_comment: true,
  delete_action_id: "your-delete-action-id",
  trigger_id: "1234567890123.1234567890123.abcdef01234567890abcdef012345689",
});

// Inspect the response
console.log(response);
