/**
 * Displays formatted, structured representation of text.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/rich-text-block/}
 */

/**
 * Four basic rich text section examples (basic, bold, italic, strikethrough).
 *
 * @returns {Array<import('@slack/types').RichTextBlock>}
 */
export function example01() {
  /**
   * @type {Array<import('@slack/types').RichTextBlock>}
   */
  const blocks = [
    {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "text",
              text: "Hello there, I am a basic rich text block!",
            },
          ],
        },
      ],
    },
    {
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
    },
    {
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
              text: "I am an italic rich text block!",
              style: {
                italic: true,
              },
            },
          ],
        },
      ],
    },
    {
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
              text: "I am a strikethrough rich text block!",
              style: {
                strike: true,
              },
            },
          ],
        },
      ],
    },
  ];
  return blocks;
}

/**
 * A rich text block with a bullet list.
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
 * A rich text block with a nested bullet list.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example03() {
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

/**
 * A rich text block with preformatted code.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example04() {
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

/**
 * A rich text block with a quote.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example05() {
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

/**
 * A rich text block with a broadcast element.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example06() {
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
            type: "broadcast",
            range: "everyone",
          },
        ],
      },
    ],
  };
  return block;
}

/**
 * A rich text block with a color element.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example07() {
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

/**
 * A rich text block with a channel element.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example08() {
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
            type: "channel",
            channel_id: "C123ABC456",
          },
        ],
      },
    ],
  };
  return block;
}

/**
 * A rich text block with a date element.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example09() {
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

/**
 * A rich text block with emoji elements.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example10() {
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
            type: "emoji",
            name: "basketball",
          },
          {
            type: "text",
            text: " ",
          },
          {
            type: "emoji",
            name: "snowboarder",
          },
          {
            type: "text",
            text: " ",
          },
          {
            type: "emoji",
            name: "checkered_flag",
          },
        ],
      },
    ],
  };
  return block;
}

/**
 * A rich text block with a link element.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example11() {
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
            url: "https://api.slack.com",
          },
        ],
      },
    ],
  };
  return block;
}

/**
 * A rich text block with a user mention element.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example12() {
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
            type: "user",
            user_id: "U123ABC456",
          },
        ],
      },
    ],
  };
  return block;
}

/**
 * A rich text block with a usergroup mention element.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example13() {
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
            type: "usergroup",
            usergroup_id: "G123ABC456",
          },
        ],
      },
    ],
  };
  return block;
}
