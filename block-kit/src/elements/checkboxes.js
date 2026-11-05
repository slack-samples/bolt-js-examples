/**
 * Allows users to choose multiple items from a list of options.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/checkboxes-element/}
 */

/**
 * A section block containing a group of checkboxes.
 *
 * @returns {import('@slack/types').ModalView}
 */
export function example01() {
  /**
   * @type {import('@slack/types').ModalView}
   */
  const view = {
    type: "modal",
    title: {
      type: "plain_text",
      text: "My App",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true,
    },
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "plain_text",
          text: "Check out these charming checkboxes",
        },
        accessory: {
          type: "checkboxes",
          action_id: "this_is_an_action_id",
          initial_options: [
            {
              value: "A1",
              text: {
                type: "plain_text",
                text: "Checkbox 1",
              },
            },
          ],
          options: [
            {
              value: "A1",
              text: {
                type: "plain_text",
                text: "Checkbox 1",
              },
            },
            {
              value: "A2",
              text: {
                type: "plain_text",
                text: "Checkbox 2",
              },
              description:
                /** @type {import('@slack/types').PlainTextElement} */ (
                  /** @type {unknown} */ ({
                    type: "mrkdwn",
                    text: "*A description of option two*",
                  })
                ),
            },
          ],
        },
      },
    ],
  };
  return view;
}
