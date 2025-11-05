/**
 * Collects information from users via elements.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/input-block/}
 */

/**
 * An input block containing a plain-text input element.
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
    },
    label: {
      type: "plain_text",
      text: "Label",
      emoji: true,
    },
  };
  return block;
}
