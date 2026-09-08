/**
 * Displays a formatted, localized date.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/date-element/}
 */

/**
 * A rich text block with a date element in a section.
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
            type: "date",
            timestamp: 1720710212,
            format: "{date_num} at {time}",
            fallback: "timey",
          },
        ],
      },
    ],
  };
  return block;
}
