/**
 * Allows users to choose one item from a list of possible options.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/radio-button-group-element/}
 */

/**
 * A section block with a radio buttons accessory.
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
      type: "plain_text",
      text: "Check out these rad radio buttons",
    },
    accessory: {
      type: "radio_buttons",
      action_id: "this_is_an_action_id",
      initial_option: {
        value: "A1",
        text: {
          type: "plain_text",
          text: "Radio 1",
        },
      },
      options: [
        {
          value: "A1",
          text: {
            type: "plain_text",
            text: "Radio 1",
          },
        },
        {
          value: "A2",
          text: {
            type: "plain_text",
            text: "Radio 2",
          },
        },
      ],
    },
  };
  return block;
}
