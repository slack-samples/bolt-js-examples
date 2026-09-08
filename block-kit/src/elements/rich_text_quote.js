/**
 * Displays a rich text quote block.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/rich-text-quote-element/}
 */

/**
 * A rich text block with a quote followed by a section.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').RichTextBlock}
   */
  const block = {
    type: "rich_text",
    block_id: "Vrzsu",
    elements: [
      {
        type: "rich_text_quote",
        elements: [
          {
            type: "text",
            text: "What we need is good examples in our documentation.",
          },
        ],
      },
      {
        type: "rich_text_section",
        elements: [
          {
            type: "text",
            text: "Yes - I completely agree, Luke!",
          },
        ],
      },
    ],
  };
  return block;
}
