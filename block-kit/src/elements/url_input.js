/**
 * Allows user to enter a URL into a single-line field.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/url-input-element/}
 */

/**
 * An input block with a URL input element.
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
      type: "url_text_input",
      action_id: "url_text_input-action",
    },
    label: {
      type: "plain_text",
      text: "Label",
      emoji: true,
    },
  };
  return block;
}
