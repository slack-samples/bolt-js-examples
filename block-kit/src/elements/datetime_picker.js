/**
 * Allows users to select both a date and a time of day.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/datetime-picker-element/}
 */

/**
 * An input block with a datetime picker element.
 *
 * @returns {import('@slack/types').InputBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').InputBlock}
   */
  const block = {
    type: "input",
    element: {
      type: "datetimepicker",
      action_id: "datetimepicker-action",
    },
    hint: {
      type: "plain_text",
      text: "This is some hint text",
      emoji: true,
    },
    label: {
      type: "plain_text",
      text: "Start date",
      emoji: true,
    },
  };
  return block;
}
