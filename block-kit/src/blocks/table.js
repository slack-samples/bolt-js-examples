/**
 * Displays structured information in a table.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/table-block/}
 */

/**
 * A table block with a header row and rich text cells that link out.
 *
 * @returns {import('@slack/types').TableBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').TableBlock}
   */
  const block = {
    type: "table",
    column_settings: [
      {
        is_wrapped: true,
      },
      {
        align: "right",
      },
    ],
    rows: [
      [
        {
          type: "raw_text",
          text: "Header A",
        },
        {
          type: "raw_text",
          text: "Header B",
        },
      ],
      [
        {
          type: "raw_text",
          text: "Data 1A",
        },
        {
          type: "rich_text",
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "link",
                  text: "Data 1B",
                  url: "https://slack.com",
                },
              ],
            },
          ],
        },
      ],
      [
        {
          type: "raw_text",
          text: "Data 2A",
        },
        {
          type: "rich_text",
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "link",
                  text: "Data 2B",
                  url: "https://slack.com",
                },
              ],
            },
          ],
        },
      ],
    ],
  };
  return block;
}
