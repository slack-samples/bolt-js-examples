/**
 * Allows users to enter freeform text data into a single-line or multi-line field.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/plain-text-input-element/}
 */

/**
 * An input block with a plain-text input element.
 *
 * @returns {import('@slack/types').InputBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').InputBlock}
   */
  const block = {
    type: "input",
    element: {
      type: "plain_text_input",
      action_id: "plain_text_input-action",
    },
    label: {
      type: "plain_text",
      text: "Label",
      emoji: true,
    },
  };
  return block;
}
