/**
 * Renders as a mention of a user group.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/usergroup-element/}
 */

/**
 * A rich text block with a user group mention in a section.
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
            type: "usergroup",
            usergroup_id: "G123ABC456",
          },
        ],
      },
    ],
  };
  return block;
}
