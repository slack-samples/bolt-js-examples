/**
 * Allows users a direct path to performing basic actions.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/block-elements/button-element/}
 */

/**
 * A regular interactive button.
 *
 * @returns {import('@slack/types').Button}
 */
export function example01() {
  /**
   * @type {import('@slack/types').Button}
   */
  const element = {
    type: "button",
    text: {
      type: "plain_text",
      text: "Click Me",
    },
    value: "click_me_123",
    action_id: "button",
  };
  return element;
}

/**
 * A button with a primary style attribute.
 *
 * @returns {import('@slack/types').Button}
 */
export function example02() {
  /**
   * @type {import('@slack/types').Button}
   */
  const element = {
    type: "button",
    text: {
      type: "plain_text",
      text: "Save",
    },
    style: "primary",
    value: "click_me_123",
    action_id: "button",
  };
  return element;
}

/**
 * A link button.
 *
 * @returns {import('@slack/types').Button}
 */
export function example03() {
  /**
   * @type {import('@slack/types').Button}
   */
  const element = {
    type: "button",
    text: {
      type: "plain_text",
      text: "Link Button",
    },
    url: "https://docs.slack.dev/block-kit",
  };
  return element;
}

/**
 * The button element used inside either the section or actions block.
 *
 * @returns {(import('@slack/types').SectionBlock | import('@slack/types').ActionsBlock)[]}
 */
export function example05() {
  /**
   * @type {(import('@slack/types').SectionBlock | import('@slack/types').ActionsBlock)[]}
   */
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "This is a section block with a button.",
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: "Click Me",
        },
        value: "click_me_123",
        action_id: "button",
      },
    },
    {
      type: "actions",
      block_id: "actionblock789",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Primary Button",
          },
          style: "primary",
          value: "click_me_456",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Link Button",
          },
          url: "https://api.slack.com/block-kit",
        },
      ],
    },
  ];
  return blocks;
}
