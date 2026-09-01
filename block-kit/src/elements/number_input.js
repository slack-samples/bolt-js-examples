/**
 * Allows user to enter a number into a single-line field.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/number-input-element/}
 */

/**
 * An input block with a number input element.
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
      type: "number_input",
      is_decimal_allowed: false,
      action_id: "number_input-action",
    },
    label: {
      type: "plain_text",
      text: "Label",
      emoji: true,
    },
  };
  return block;
}
