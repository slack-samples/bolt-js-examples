/**
 * Defines an object containing some text.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/text-object/}
 */

/**
 * A section block containing a text object.
 *
 * @returns {import('@slack/types').SectionBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').SectionBlock}
   */
  const block = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "A message *with some bold text* and _some italicized text_.",
    },
  };
  return block;
}
