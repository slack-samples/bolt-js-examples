/**
 * Allows user to enter an email into a single-line field.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/email-input-element/}
 */

/**
 * An input block with an email input element.
 *
 * @returns {import('@slack/types').InputBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').InputBlock}
   */
  const block = {
    type: "input",
    block_id: "input123",
    label: {
      type: "plain_text",
      text: "Email Address",
    },
    element: {
      type: "email_text_input",
      action_id: "email_text_input-action",
      placeholder: {
        type: "plain_text",
        text: "Enter an email",
      },
    },
  };
  return block;
}
