/**
 * Displays a plan with multiple task cards representing a sequence of actions.
 *
 * This is an experimental block type that requires a toggle to preview.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/plan-block/}
 */

/**
 * A plan block with multiple task cards in various states.
 *
 * @returns {import('@slack/types').PlanBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').PlanBlock}
   */
  const block = {
    type: "plan",
    title: "Thinking completed",
    tasks: [
      {
        task_id: "call_001",
        title: "Fetched user profile information",
        status: "in_progress",
        details: {
          type: "rich_text",
          block_id: "viMWO",
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Searched database...",
                },
              ],
            },
          ],
        },
        output: {
          type: "rich_text",
          block_id: "viMWO",
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Profile data loaded",
                },
              ],
            },
          ],
        },
      },
      {
        task_id: "call_002",
        title: "Checked user permissions",
        status: "pending",
      },
      {
        task_id: "call_003",
        title: "Generated comprehensive user report",
        status: "complete",
        output: {
          type: "rich_text",
          block_id: "crsk",
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "15 data points compiled",
                },
              ],
            },
          ],
        },
      },
    ],
  };
  return block;
}
