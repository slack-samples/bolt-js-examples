/**
 * Displays text, possibly alongside elements.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/section-block/}
 */

/**
 * A text section block.
 *
 * @returns {import('@slack/types').SectionBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').SectionBlock}
   */
  const block = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "A message *with some bold text* and _some italicized text_.",
    },
  };
  return block;
}

/**
 * A section block containing text fields.
 *
 * @returns {import('@slack/types').SectionBlock}
 */
export function example02() {
  /**
   * @type {import('@slack/types').SectionBlock}
   */
  const block = {
    type: "section",
    text: {
      text: "A message *with some bold text* and _some italicized text_.",
      type: "mrkdwn",
    },
    fields: [
      {
        type: "mrkdwn",
        text: "High",
      },
      {
        type: "plain_text",
        emoji: true,
        text: "Silly",
      },
    ],
  };
  return block;
}

/**
 * A section block containing a datepicker element.
 *
 * @returns {import('@slack/types').SectionBlock}
 */
export function example03() {
  /**
   * @type {import('@slack/types').SectionBlock}
   */
  const block = {
    type: "section",
    text: {
      text: "*Haley* has requested you set a deadline for finding a house",
      type: "mrkdwn",
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
