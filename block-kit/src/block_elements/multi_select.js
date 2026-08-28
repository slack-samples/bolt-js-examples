/**
 * Allows users to select multiple items from a list of options.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/multi-select-menu-element/}
 */

/**
 * A section block with a static multi-select menu accessory.
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
      text: "Pick items from the list",
    },
    accessory: {
      action_id: "text1234",
      type: "multi_static_select",
      placeholder: {
        type: "plain_text",
        text: "Select items",
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
 * A section block with an external multi-select menu accessory.
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
      text: "Pick items from the list",
    },
    accessory: {
      action_id: "text1234",
      type: "multi_external_select",
      placeholder: {
        type: "plain_text",
        text: "Select items",
      },
      min_query_length: 3,
    },
  };
  return block;
}

/**
 * A section block with a users multi-select menu accessory.
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
      text: "Pick users from the list",
    },
    accessory: {
      action_id: "text1234",
      type: "multi_users_select",
      placeholder: {
        type: "plain_text",
        text: "Select users",
      },
    },
  };
  return block;
}

/**
 * A section block with a conversations multi-select menu accessory.
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
      text: "Pick conversations from the list",
    },
    accessory: {
      action_id: "text1234",
      type: "multi_conversations_select",
      placeholder: {
        type: "plain_text",
        text: "Select conversations",
      },
    },
  };
  return block;
}

/**
 * A section block with a channels multi-select menu accessory.
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
      text: "Pick channels from the list",
    },
    accessory: {
      action_id: "text1234",
      type: "multi_channels_select",
      placeholder: {
        type: "plain_text",
        text: "Select channels",
      },
    },
  };
  return block;
}
