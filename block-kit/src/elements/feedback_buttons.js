/**
 * Buttons to indicate positive or negative feedback.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/feedback-buttons-element/}
 */

/**
 * A context actions block with feedback buttons.
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
            text: "Good",
          },
          value: "positive_feedback",
          accessibility_label: "Mark this response as good",
        },
        negative_button: {
          text: {
            type: "plain_text",
            text: "Bad",
          },
          value: "negative_feedback",
          accessibility_label: "Mark this response as bad",
        },
      },
    ],
  };
  return block;
}
