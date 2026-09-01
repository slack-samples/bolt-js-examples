/**
 * Defines an object containing Slack file information to be used in an image block or image element.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/slack-file-object/}
 */

/**
 * An image block containing a Slack file object referenced by url.
 *
 * @returns {import('@slack/types').ImageBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').ImageBlock}
   */
  const block = {
    type: "image",
    title: {
      type: "plain_text",
      text: "Please enjoy this photo of a kitten",
    },
    block_id: "image4",
    slack_file: {
      url: "https://files.slack.com/files-pri/T0123456-F0123456/xyz.png",
    },
    alt_text: "An incredibly cute kitten.",
  };
  return block;
}

/**
 * An image block containing a Slack file object referenced by id.
 *
 * @returns {import('@slack/types').ImageBlock}
 */
export function example02() {
  /**
   * @type {import('@slack/types').ImageBlock}
   */
  const block = {
    type: "image",
    title: {
      type: "plain_text",
      text: "Please enjoy this photo of a kitten",
    },
    block_id: "image4",
    slack_file: {
      id: "F0123456",
    },
    alt_text: "An incredibly cute kitten.",
  };
  return block;
}
