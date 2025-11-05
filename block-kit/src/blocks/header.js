/**
 * Displays a larger-sized text.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/header-block/}
 */

/**
 * A simple header block.
 *
 * @returns {import('@slack/types').HeaderBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').HeaderBlock}
   */
  const block = {
    type: "header",
    text: {
      type: "plain_text",
      text: "A Heartfelt Header",
    },
  };
  return block;
}
