/**
 * Displays structured, paginated data in rows and columns.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/data-table-block/}
 */

/**
 * The `data_table` block is net-new and not yet exported by `@slack/types`,
 * so the shape is documented locally until the type ships upstream.
 *
 * @typedef {Object} DataTableBlock
 * @property {"data_table"} type
 * @property {string} caption A short, descriptive title for the table.
 * @property {(import('@slack/types').RawTextElement | import('@slack/types').RichTextBlock)[][]} rows An array of rows, where each row is an array of cells.
 * @property {number} [page_size] The number of rows to display per page (1-100). Defaults to 5.
 * @property {number} [row_header_column_index] The zero-based index of the column used to identify each row. Defaults to 0.
 * @property {string} [block_id] A unique identifier for the block.
 */

/**
 * A data table of departments with rich text cells.
 *
 * @returns {DataTableBlock}
 */
export function example01() {
  /**
   * @type {DataTableBlock}
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
