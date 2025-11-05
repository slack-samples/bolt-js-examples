/**
 * Displays info about remote files.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/file-block/}
 */

/**
 * A file block for a remote file.
 *
 * @returns {import('@slack/types').FileBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').FileBlock}
   */
  const block = {
    type: "file",
    external_id: "ABCD1",
    source: "remote",
  };
  return block;
}
