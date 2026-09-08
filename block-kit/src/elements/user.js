/**
 * Renders as a mention of a user.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/user-element/}
 */

/**
 * A rich text block with a user mention in a section.
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
            type: "user",
            user_id: "U123ABC456",
          },
        ],
      },
    ],
  };
  return block;
}
