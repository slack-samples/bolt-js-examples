/**
 * Allows users to select a date from a calendar style UI.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/date-picker-element/}
 */

/**
 * A section block with a date picker accessory.
 *
 * @returns {import('@slack/types').SectionBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').SectionBlock}
   */
  const block = {
    type: "section",
    block_id: "section1234",
    text: {
      type: "mrkdwn",
      text: "Pick a date for the deadline.",
    },
    accessory: {
      type: "datepicker",
      action_id: "datepicker123",
      initial_date: "1990-04-28",
      placeholder: {
        type: "plain_text",
        text: "Select a date",
      },
    },
  };
  return block;
}
