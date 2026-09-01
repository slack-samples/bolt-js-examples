/**
 * Defines a dialog that adds a confirmation step to interactive elements.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/confirmation-dialog-object/}
 */

/**
 * An actions block with a button carrying a confirmation dialog.
 *
 * @returns {import('@slack/types').ActionsBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').ActionsBlock}
   */
  const block = {
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          emoji: true,
          text: "Approve",
        },
        confirm: {
          title: {
            type: "plain_text",
            text: "Are you sure?",
          },
          text: {
            type: "mrkdwn",
            text: "Would you not prefer a good game of _chess_?",
          },
          confirm: {
            type: "plain_text",
            text: "Do it",
          },
          deny: {
            type: "plain_text",
            text: "Stop, I changed my mind!",
          },
        },
        style: "primary",
        value: "click_me_123",
      },
      {
        type: "button",
        text: {
          type: "plain_text",
          emoji: true,
          text: "Deny",
        },
        style: "danger",
        value: "click_me_123",
      },
    ],
  };
  return block;
}
