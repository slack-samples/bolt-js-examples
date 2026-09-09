/**
 * Defines an object containing workflow information.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/workflow-object/}
 */

/**
 * A workflow object inside the accessory of a section block.
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
      text: "A message *with some bold text* and _some italicized text_.",
      type: "mrkdwn",
    },
    accessory: {
      type: "workflow_button",
      text: {
        type: "plain_text",
        text: "Run Workflow",
      },
      action_id: "workflowbutton123",
      workflow: {
        trigger: {
          url: "https://slack.com/shortcuts/Ft0123ABC456/xyz...zyx",
          customizable_input_parameters: [
            {
              name: "input_parameter_a",
              value: "Value for input param A",
            },
            {
              name: "input_parameter_b",
              value: "Value for input param B",
            },
          ],
        },
      },
    },
  };
  return block;
}
