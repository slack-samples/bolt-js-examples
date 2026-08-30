/**
 * Allows users to upload files.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/file-input-element/}
 */

/**
 * A modal view with a file input element hosted in an input block.
 *
 * @returns {import('@slack/types').View}
 */
export function example01() {
  /**
   * @type {import('@slack/types').View}
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
        block_id: "input_block_id",
        label: {
          type: "plain_text",
          text: "Upload Files",
        },
        element: {
          type: "file_input",
          action_id: "file_input_action_id_1",
          filetypes: ["jpg", "png"],
          max_files: 5,
        },
      },
    ],
  };
  return view;
}
