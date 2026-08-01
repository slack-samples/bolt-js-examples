/**
 * Displays structured, paginated data in rows and columns.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/data-table-block/}
 */

/**
 * A data table of departments with rich text cells.
 *
 * @returns {import('@slack/types').DataTableBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').DataTableBlock}
   */
  const block = {
    type: "data_table",
    caption: "A Fabulous Table",
    rows: [
      [
        { type: "raw_text", text: "Name" },
        { type: "raw_text", text: "Department" },
        { type: "raw_text", text: "Badge" },
      ],
      [
        { type: "raw_text", text: "Data Refinement Department" },
        { type: "raw_text", text: "MDR" },
        {
          type: "rich_text",
          elements: [
            {
              type: "rich_text_section",
              elements: [{ type: "text", text: "Blue", style: { bold: true } }],
            },
          ],
        },
      ],
      [
        { type: "raw_text", text: "Art Sourcing Department" },
        { type: "raw_text", text: "O&D" },
        {
          type: "rich_text",
          elements: [
            {
              type: "rich_text_section",
              elements: [
                { type: "text", text: "Green" },
                { type: "text", text: "review", style: { italic: true } },
              ],
            },
          ],
        },
      ],
      [
        { type: "raw_text", text: "Wellness Department" },
        { type: "raw_text", text: "Wellness Center" },
        {
          type: "rich_text",
          elements: [
            {
              type: "rich_text_section",
              elements: [
                { type: "text", text: "Limited", style: { bold: true } },
              ],
            },
          ],
        },
      ],
    ],
  };
  return block;
}
