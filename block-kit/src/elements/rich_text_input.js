/**
 * Allows users to enter formatted text in a WYSIWYG composer, offering the same messaging writing experience as in Slack.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/rich-text-input-element/}
 */

/**
 * A home view with an input block containing a rich text input element.
 *
 * @returns {import('@slack/types').HomeView}
 */
export function example01() {
  /**
   * @type {import('@slack/types').HomeView}
   */
  const view = {
    blocks: [
      {
        type: "input",
        element: {
          type: "rich_text_input",
          action_id: "rich_text_input-action",
          dispatch_action_config: {
            trigger_actions_on: ["on_character_entered"],
          },
          focus_on_load: true,
          placeholder: {
            type: "plain_text",
            text: "Enter text",
          },
        },
        label: {
          type: "plain_text",
          text: "Label",
          emoji: true,
        },
      },
    ],
    type: "home",
  };
  return view;
}
