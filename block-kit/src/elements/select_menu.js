/**
 * Allows users to choose an option from a drop down menu.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/select-menu-element/}
 */

/**
 * A section block with a static select menu accessory.
 *
 * @returns {import('@slack/types').SectionBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').SectionBlock}
   */
  const block = {
    type: "section",
    block_id: "section678",
    text: {
      type: "mrkdwn",
      text: "Pick an item from the dropdown list",
    },
    accessory: {
      action_id: "text1234",
      type: "static_select",
      placeholder: {
        type: "plain_text",
        text: "Select an item",
      },
      options: [
        {
          text: {
            type: "plain_text",
            text: "*this is plain_text text*",
          },
          value: "value-0",
        },
        {
          text: {
            type: "plain_text",
            text: "*this is plain_text text*",
          },
          value: "value-1",
        },
        {
          text: {
            type: "plain_text",
            text: "*this is plain_text text*",
          },
          value: "value-2",
        },
      ],
    },
  };
  return block;
}

/**
 * A section block with an external select menu accessory.
 *
 * @returns {import('@slack/types').SectionBlock}
 */
export function example02() {
  /**
   * @type {import('@slack/types').SectionBlock}
   */
  const block = {
    type: "section",
    block_id: "section678",
    text: {
      type: "mrkdwn",
      text: "Pick an item from the dropdown list",
    },
    accessory: {
      action_id: "text1234",
      type: "external_select",
      placeholder: {
        type: "plain_text",
        text: "Select an item",
      },
      min_query_length: 3,
    },
  };
  return block;
}

/**
 * A section block with a users select menu accessory.
 *
 * @returns {import('@slack/types').SectionBlock}
 */
export function example03() {
  /**
   * @type {import('@slack/types').SectionBlock}
   */
  const block = {
    type: "section",
    block_id: "section678",
    text: {
      type: "mrkdwn",
      text: "Pick a user from the dropdown list",
    },
    accessory: {
      action_id: "text1234",
      type: "users_select",
      placeholder: {
        type: "plain_text",
        text: "Select an item",
      },
    },
  };
  return block;
}

/**
 * A section block with a conversations select menu accessory.
 *
 * @returns {import('@slack/types').SectionBlock}
 */
export function example04() {
  /**
   * @type {import('@slack/types').SectionBlock}
   */
  const block = {
    type: "section",
    block_id: "section678",
    text: {
      type: "mrkdwn",
      text: "Pick a conversation from the dropdown list",
    },
    accessory: {
      action_id: "text1234",
      type: "conversations_select",
      placeholder: {
        type: "plain_text",
        text: "Select an item",
      },
    },
  };
  return block;
}

/**
 * A section block with a channels select menu accessory.
 *
 * @returns {import('@slack/types').SectionBlock}
 */
export function example05() {
  /**
   * @type {import('@slack/types').SectionBlock}
   */
  const block = {
    type: "section",
    block_id: "section678",
    text: {
      type: "mrkdwn",
      text: "Pick a channel from the dropdown list",
    },
    accessory: {
      action_id: "text1234",
      type: "channels_select",
      placeholder: {
        type: "plain_text",
        text: "Select an item",
      },
    },
  };
  return block;
}
