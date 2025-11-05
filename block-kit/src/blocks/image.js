/**
 * Displays an image.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/image-block/}
 */

/**
 * An image block using image_url.
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
    image_url: "http://placekitten.com/500/500",
    alt_text: "An incredibly cute kitten.",
  };
  return block;
}

/**
 * An image block using slack_file with a url.
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
      url: "https://files.slack.com/files-pri/T0123456-F0123456/xyz.png",
    },
    alt_text: "An incredibly cute kitten.",
  };
  return block;
}

/**
 * An image block using slack_file with an id.
 *
 * @returns {import('@slack/types').ImageBlock}
 */
export function example03() {
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
