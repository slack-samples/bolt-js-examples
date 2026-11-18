/**
 * Allows users to enter numerical data into a single-line field.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/time-picker-element/}
 */

/**
 * A section block with a time picker accessory.
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
      type: "timepicker",
      timezone: "America/Los_Angeles",
      action_id: "timepicker123",
      initial_time: "11:40",
      placeholder: {
        type: "plain_text",
        text: "Select a time",
      },
    },
  };
  return block;
}
