/**
 * Allows users to press a button to view a list of options.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/overflow-menu-element/}
 */

/**
 * A section block with an overflow menu accessory.
 *
 * @returns {import('@slack/types').SectionBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').SectionBlock}
   */
  const block = {
    type: "section",
    block_id: "section 890",
    text: {
      type: "mrkdwn",
      text: "This is a section block with an overflow menu.",
    },
    accessory: {
      type: "overflow",
      action_id: "overflow",
      options: [
        {
          text: {
            type: "plain_text",
            text: "*this is plain_text text*",
          },
          value: "value-0",
        },
        {
          text: {
            type: "plain_text",
            text: "*this is plain_text text*",
          },
          value: "value-1",
        },
        {
          text: {
            type: "plain_text",
            text: "*this is plain_text text*",
          },
          value: "value-2",
        },
        {
          text: {
            type: "plain_text",
            text: "*this is plain_text text*",
          },
          value: "value-3",
        },
        {
          text: {
            type: "plain_text",
            text: "*this is plain_text text*",
          },
          value: "value-4",
        },
      ],
    },
  };
  return block;
}
