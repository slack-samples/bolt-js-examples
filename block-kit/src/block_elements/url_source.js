/**
 * Displays a URL source with optional icon.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/url-source-element/}
 */

/**
 * A URL source element.
 *
 * @returns {import('@slack/types').URLSourceElement}
 */
export function example01() {
  /**
   * @type {import('@slack/types').URLSourceElement}
   */
  const element = {
    type: "url",
    url: "https://docs.slack.dev/",
    text: "Slack API docs",
  };
  return element;
}

/**
 * A task card block with URL source elements.
 *
 * @returns {import('@slack/types').TaskCardBlock}
 */
export function example02() {
  /**
   * @type {import('@slack/types').TaskCardBlock}
   */
  const block = {
    type: "task_card",
    task_id: "task_1",
    title: "Scientific findings",
    status: "complete",
    sources: [
      {
        type: "url",
        url: "https://docs.example.com/",
        text: "Tracy's delightful docs",
      },
      {
        type: "url",
        url: "https://research.example.com/",
        text: "Haley's resourceful research",
      },
    ],
  };
  return block;
}
