/**
 * Holds interactive elements like feedback buttons and icon buttons.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/context-actions-block/}
 */

/**
 * Context actions block with feedback buttons.
 *
 * @returns {import('@slack/types').ContextActionsBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').ContextActionsBlock}
   */
  const block = {
    type: "context_actions",
    elements: [
      {
        type: "feedback_buttons",
        action_id: "feedback_buttons_1",
        positive_button: {
          text: {
            type: "plain_text",
            text: "👍",
          },
          value: "positive_feedback",
        },
        negative_button: {
          text: {
            type: "plain_text",
            text: "👎",
          },
          value: "negative_feedback",
        },
      },
    ],
  };
  return block;
}

/**
 * Context actions block with an icon button.
 *
 * @returns {import('@slack/types').ContextActionsBlock}
 */
export function example02() {
  /**
   * @type {import('@slack/types').ContextActionsBlock}
   */
  const block = {
    type: "context_actions",
    elements: [
      {
        type: "icon_button",
        icon: "trash",
        text: {
          type: "plain_text",
          text: "Delete",
        },
        action_id: "delete_button_1",
        value: "delete_item",
      },
    ],
  };
  return block;
}
