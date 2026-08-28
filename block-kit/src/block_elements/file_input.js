/**
 * Allows users to upload files.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/file-input-element/}
 */

/**
 * An input block with a file input element, as shown hosted in a modal.
 *
 * @returns {import('@slack/types').InputBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').InputBlock}
   */
  const block = {
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
  };
  return block;
}
