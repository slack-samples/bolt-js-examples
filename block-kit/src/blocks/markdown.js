/**
 * Displays formatted markdown.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/markdown-block/}
 */

/**
 * A markdown block.
 *
 * @returns {import('@slack/types').MarkdownBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').MarkdownBlock}
   */
  const block = {
    type: "markdown",
    text: "**Lots of information here!!**",
  };
  return block;
}
