/**
 * Visually separates pieces of info inside of a message.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/divider-block/}
 */

/**
 * A simple divider block.
 *
 * @returns {import('@slack/types').DividerBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').DividerBlock}
   */
  const block = {
    type: "divider",
  };
  return block;
}
