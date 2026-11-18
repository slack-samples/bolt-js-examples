/**
 * Displays a hyperlink.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/link-element/}
 */

/**
 * A rich text block with a link element in a section.
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
            type: "link",
            url: "https://docs.slack.dev",
          },
        ],
      },
    ],
  };
  return block;
}
