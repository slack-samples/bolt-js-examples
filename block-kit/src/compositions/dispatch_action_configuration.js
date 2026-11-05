/**
 * Defines when a plain-text input element will return a `block_actions` interaction payload.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/dispatch-action-configuration-object/}
 */

/**
 * An input block with a multiline plain-text input carrying a dispatch action configuration.
 *
 * @returns {import('@slack/types').InputBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').InputBlock}
   */
  const block = {
    type: "input",
    dispatch_action: true,
    element: {
      type: "plain_text_input",
      multiline: true,
      dispatch_action_config: {
        trigger_actions_on: ["on_character_entered"],
      },
    },
    label: {
      type: "plain_text",
      text: "This is a multiline plain-text input",
      emoji: true,
    },
  };
  return block;
}
