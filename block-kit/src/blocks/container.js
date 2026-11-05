/**
 * A general-purpose wrapper for grouping child blocks together, with a configurable size.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/container-block/}
 */

/**
 * A collapsible container with sections, a divider, context, and actions.
 *
 * @returns {import('@slack/types').ContainerBlock}
 */
export function example01() {
  /** @type {import('@slack/types').ContainerBlock} */
  const block = {
    type: "container",
    block_id: "bkb_container_bulk_update",
    title: {
      type: "plain_text",
      text: "Bulk update: 2 records selected",
    },
    subtitle: {
      type: "plain_text",
      text: "Review changes before confirming",
    },
    is_collapsible: true,
    child_blocks: [
      {
        type: "section",
        block_id: "record-row-1",
        text: {
          type: "mrkdwn",
          text: "*DCW-1024*\nStatus: Open → Closed\nAssignee: @princessdonut → @carl",
        },
      },
      {
        type: "divider",
        block_id: "bulk-div-1",
      },
      {
        type: "section",
        block_id: "record-row-2",
        text: {
          type: "mrkdwn",
          text: "*DCW-1025*\nStatus: In Progress → Closed\nAssignee: @mordecai → @carl",
        },
      },
      {
        type: "divider",
        block_id: "bulk-div-2",
      },
      {
        type: "context",
        block_id: "bulk-status-bar",
        elements: [
          {
            type: "mrkdwn",
            text: ":white_check_mark: 2 records will be updated • Status → Closed • Assignee → @carl",
          },
        ],
      },
      {
        type: "actions",
        block_id: "bulk-actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Confirm All",
              emoji: true,
            },
            style: "primary",
            action_id: "bulk_confirm",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Cancel",
              emoji: true,
            },
            action_id: "bulk_cancel",
          },
        ],
      },
    ],
  };
  return block;
}
