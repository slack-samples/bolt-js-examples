/**
 * Holds multiple interactive elements.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/actions-block/}
 */

/**
 * An actions block with a select menu and a button.
 *
 * @returns {import('@slack/types').ActionsBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').ActionsBlock}
   */
  const block = {
    type: "actions",
    block_id: "actions1",
    elements: [
      {
        type: "static_select",
        action_id: "select_2",
        placeholder: {
          type: "plain_text",
          text: "Which witch is the witchiest witch?",
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "Matilda",
            },
            value: "matilda",
          },
          {
            text: {
              type: "plain_text",
              text: "Glinda",
            },
            value: "glinda",
          },
          {
            text: {
              type: "plain_text",
              text: "Granny Weatherwax",
            },
            value: "grannyWeatherwax",
          },
          {
            text: {
              type: "plain_text",
              text: "Hermione",
            },
            value: "hermione",
          },
        ],
      },
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Cancel",
        },
        value: "cancel",
        action_id: "button_1",
      },
    ],
  };
  return block;
}

/**
 * An actions block with a datepicker, an overflow, and a button.
 *
 * @returns {import('@slack/types').ActionsBlock}
 */
export function example02() {
  /**
   * @type {import('@slack/types').ActionsBlock}
   */
  const block = {
    type: "actions",
    block_id: "actionblock789",
    elements: [
      {
        type: "datepicker",
        action_id: "datepicker123",
        initial_date: "1990-04-28",
        placeholder: {
          type: "plain_text",
          text: "Select a date",
        },
      },
      {
        type: "overflow",
        action_id: "overflow",
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
          {
            text: {
              type: "plain_text",
              text: "*this is plain_text text*",
            },
            value: "value-3",
          },
          {
            text: {
              type: "plain_text",
              text: "*this is plain_text text*",
            },
            value: "value-4",
          },
        ],
      },
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Click Me",
        },
        value: "click_me_123",
        action_id: "button",
      },
    ],
  };
  return block;
}
