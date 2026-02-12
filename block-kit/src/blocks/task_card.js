/**
 * Displays a single task which represents a single action.
 *
 * This is an experimental block type that requires a toggle to preview.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/task-card-block/}
 */

/**
 * A task card with output and sources.
 *
 * @returns {import('@slack/types').TaskCardBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').TaskCardBlock}
   */
  const block = {
    type: "task_card",
    task_id: "task_1",
    title: "Fetching weather data",
    status: "pending",
    output: {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "text",
              text: "Found weather data for Chicago from 2 sources",
            },
          ],
        },
      ],
    },
    sources: [
      {
        type: "url",
        url: "https://weather.com/",
        text: "weather.com",
      },
      {
        type: "url",
        url: "https://www.accuweather.com/",
        text: "accuweather.com",
      },
    ],
  };
  return block;
}
