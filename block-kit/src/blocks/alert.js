/**
 * Displays alerts, warnings, and informational messages within modals.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/alert-block/}
 */

/**
 * An informational alert block.
 *
 * @returns {import('@slack/types').AlertBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').AlertBlock}
   */
  const block = {
    type: "alert",
    text: {
      type: "mrkdwn",
      text: "The work is mysterious and important.",
      verbatim: false,
    },
    level: "info",
  };
  return block;
}
