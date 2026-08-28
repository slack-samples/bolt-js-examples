/**
 * A section element that holds rich text elements.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/rich-text-section-element/}
 */

/**
 * A rich text block with a basic text section.
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
            type: "text",
            text: "Hello there, I am a basic rich text block!",
          },
        ],
      },
    ],
  };
  return block;
}

/**
 * A rich text block with a bold styled text section.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example02() {
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
  };
  return block;
}

/**
 * A rich text block with an italic styled text section.
 *
 * @returns {import('@slack/types').RichTextBlock}
 */
export function example03() {
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
  };
  return block;
}

/**
 * A rich text block with a strikethrough styled text section.
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
  };
  return block;
}
