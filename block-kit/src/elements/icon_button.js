/**
 * An icon button to perform actions.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/icon-button-element/}
 */

/**
 * A context actions block with an icon button.
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
        type: "icon_button",
        icon: "trash",
        text: {
          type: "plain_text",
          text: "Delete",
        },
        action_id: "delete_button",
        value: "delete_item",
      },
    ],
  };
  return block;
}
