/**
 * Displays an image as part of a larger block of content.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/image-element/}
 */

/**
 * A section block with an image accessory using image_url.
 *
 * @returns {import('@slack/types').SectionBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').SectionBlock}
   */
  const block = {
    type: "section",
    block_id: "section567",
    text: {
      type: "mrkdwn",
      text: "This is a section block with an accessory image.",
    },
    accessory: {
      type: "image",
      image_url:
        "https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg",
      alt_text: "cute cat",
    },
  };
  return block;
}

/**
 * A section block with an image accessory using slack_file with a url.
 *
 * @returns {import('@slack/types').SectionBlock}
 */
export function example02() {
  /**
   * @type {import('@slack/types').SectionBlock}
   */
  const block = {
    type: "section",
    block_id: "section567",
    text: {
      type: "mrkdwn",
      text: "This is a section block with an accessory image.",
    },
    accessory: {
      type: "image",
      slack_file: {
        url: "https://files.slack.com/files-pri/T0123456-F0123456/xyz.png",
      },
      alt_text: "Slack file object.",
    },
  };
  return block;
}

/**
 * A section block with an image accessory using slack_file with an id.
 *
 * @returns {import('@slack/types').SectionBlock}
 */
export function example03() {
  /**
   * @type {import('@slack/types').SectionBlock}
   */
  const block = {
    type: "section",
    block_id: "section567",
    text: {
      type: "mrkdwn",
      text: "This is a section block with an accessory image.",
    },
    accessory: {
      type: "image",
      slack_file: {
        id: "F01234567",
      },
      alt_text: "Slack file object.",
    },
  };
  return block;
}
