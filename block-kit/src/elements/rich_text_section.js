/**
 * A section element that holds rich text elements.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/rich-text-section-element/}
 */

/**
 * Rich text blocks showing basic, bold, italic, and strikethrough text sections.
 *
 * @returns {import('@slack/types').RichTextBlock[]}
 */
export function example01() {
  /**
   * @type {import('@slack/types').RichTextBlock[]}
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
