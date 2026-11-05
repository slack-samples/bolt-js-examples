/**
 * Displays a color swatch from a hex value.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/color-element/}
 */

/**
 * A rich text block with a color element in a section.
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
            type: "color",
            value: "#F405B3",
          },
        ],
      },
    ],
  };
  return block;
}
