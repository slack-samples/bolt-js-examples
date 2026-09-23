/**
 * Displays an emoji.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/emoji-element/}
 */

/**
 * A rich text block with emoji elements in a section.
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
            type: "emoji",
            name: "basketball",
          },
          {
            type: "text",
            text: " ",
          },
          {
            type: "emoji",
            name: "snowboarder",
          },
          {
            type: "text",
            text: " ",
          },
          {
            type: "emoji",
            name: "checkered_flag",
          },
        ],
      },
    ],
  };
  return block;
}
