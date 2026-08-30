/**
 * Displays a list of rich text items.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/rich-text-list-element/}
 */

/**
 * A rich text block with a bulleted list.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').RichTextBlock}
   */
  const block = {
    type: "rich_text",
    block_id: "block1",
    elements: [
      {
        type: "rich_text_section",
        elements: [
          {
            type: "text",
            text: "My favorite Slack features (in no particular order):",
          },
        ],
      },
      {
        type: "rich_text_list",
        elements: [
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "Huddles",
              },
            ],
          },
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "Canvas",
              },
            ],
          },
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "Developing with Block Kit",
              },
            ],
          },
        ],
        style: "bullet",
        indent: 0,
        border: 1,
      },
    ],
  };
  return block;
}

/**
 * A rich text block with nested bulleted lists using indent.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example02() {
  /**
   * @type {import('@slack/types').RichTextBlock}
   */
  const block = {
    type: "rich_text",
    block_id: "block1",
    elements: [
      {
        type: "rich_text_section",
        elements: [
          {
            type: "text",
            text: "Breakfast foods I enjoy:",
          },
        ],
      },
      {
        type: "rich_text_list",
        style: "bullet",
        elements: [
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "Hashbrowns",
              },
            ],
          },
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "Eggs",
              },
            ],
          },
        ],
      },
      {
        type: "rich_text_list",
        style: "bullet",
        indent: 1,
        elements: [
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "Scrambled",
              },
            ],
          },
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "Over easy",
              },
            ],
          },
        ],
      },
      {
        type: "rich_text_list",
        style: "bullet",
        elements: [
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "Pancakes, extra syrup",
              },
            ],
          },
        ],
      },
    ],
  };
  return block;
}
