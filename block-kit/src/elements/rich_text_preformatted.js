/**
 * Displays a preformatted rich text element.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/rich-text-preformatted-element/}
 */

/**
 * A rich text block with a preformatted code section.
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
        type: "rich_text_preformatted",
        elements: [
          {
            type: "text",
            text: '{\n  "object": {\n    "description": "this is an example of a json object"\n  }\n}',
          },
        ],
        border: 0,
      },
    ],
  };
  return block;
}
