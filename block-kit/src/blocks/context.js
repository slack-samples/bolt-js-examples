/**
 * Provides contextual info, which can include both images and text.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/context-block/}
 */

/**
 * A context block with an image and text.
 *
 * @returns {import('@slack/types').ContextBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').ContextBlock}
   */
  const block = {
    type: "context",
    elements: [
      {
        type: "image",
        image_url:
          "https://image.freepik.com/free-photo/red-drawing-pin_1156-445.jpg",
        alt_text: "images",
      },
      {
        type: "mrkdwn",
        text: "Location: **Dogpatch**",
      },
    ],
  };
  return block;
}
