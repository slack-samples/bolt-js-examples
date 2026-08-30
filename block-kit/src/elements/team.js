/**
 * Renders as a mention of a workspace or team.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/team-element/}
 */

/**
 * A rich text block with a team mention in a section.
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
            type: "team",
            team_id: "T123ABC456",
          },
        ],
      },
    ],
  };
  return block;
}
