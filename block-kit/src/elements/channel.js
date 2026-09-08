/**
 * Renders as a mention of a channel.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/channel-element/}
 */

/**
 * A rich text block with a channel mention in a section.
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
            type: "channel",
            channel_id: "C123ABC456",
          },
        ],
      },
    ],
  };
  return block;
}
