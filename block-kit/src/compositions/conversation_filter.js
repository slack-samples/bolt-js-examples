/**
 * Defines a filter for the list of options in a conversation selector menu.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/conversation-filter-object/}
 */

/**
 * A modal view with a conversations select input carrying a conversation filter.
 *
 * @returns {import('@slack/types').ModalView}
 */
export function example01() {
  /**
   * @type {import('@slack/types').ModalView}
   */
  const view = {
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
    type: "modal",
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "input",
        element: {
          type: "conversations_select",
          placeholder: {
            type: "plain_text",
            text: "Select a conversation",
            emoji: true,
          },
          filter: {
            include: ["public", "mpim"],
            exclude_bot_users: true,
          },
        },
        label: {
          type: "plain_text",
          text: "Choose the conversation to publish your result to:",
          emoji: true,
        },
      },
    ],
  };
  return view;
}
