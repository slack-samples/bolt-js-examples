/**
 * Displays text, optionally with styling.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/text-element/}
 */

/**
 * A rich text block with plain and bold text elements in a section.
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
            type: "text",
            text: "Hello there, ",
          },
          {
            type: "text",
            text: "I am a bold rich text block!",
            style: {
              bold: true,
            },
          },
        ],
      },
    ],
  };
  return block;
}
