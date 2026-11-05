/**
 * Displays a broadcast mention such as here, channel, or everyone.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/broadcast-element/}
 */

/**
 * A rich text block with a broadcast mention in a section.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').RichTextBlock}
   */
  const block = {
    type: "rich_text",
    elements: [
      {
        type: "rich_text_section",
        elements: [
          {
            type: "broadcast",
            range: "everyone",
          },
        ],
      },
    ],
  };
  return block;
}
