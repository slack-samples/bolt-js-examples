/**
 * Displays a card, a container for related content with an optional image, title, body, and actions.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/card-block/}
 */

/**
 * A full card with an icon, title, subtitle, hero image, body, and an action button.
 *
 * @returns {import('@slack/types').CardBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').CardBlock}
   */
  const block = {
    type: "card",
    icon: {
      type: "image",
      image_url: "https://picsum.photos/36/36",
      alt_text: "Icon",
    },
    title: {
      type: "mrkdwn",
      text: "Lumon Industries",
      verbatim: false,
    },
    subtitle: {
      type: "mrkdwn",
      text: "Committed to work-life balance",
      verbatim: false,
    },
    hero_image: {
      type: "image",
      image_url: "https://picsum.photos/400/300",
      alt_text: "Sample hero image",
    },
    body: {
      type: "mrkdwn",
      text: "Please enjoy each card equally.",
      verbatim: false,
    },
    actions: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Action Button",
          emoji: false,
        },
        action_id: "button_action",
      },
    ],
  };
  return block;
}

/**
 * A minimal card with only a title and an action button. At least one of
 * `hero_image`, `title`, `actions`, or `body` is required on a card.
 *
 * @returns {import('@slack/types').CardBlock}
 */
export function example02() {
  /**
   * @type {import('@slack/types').CardBlock}
   */
  const block = {
    type: "card",
    title: {
      type: "mrkdwn",
      text: "Pick your refinement number",
    },
    actions: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Refine",
        },
        action_id: "refine_action",
      },
    ],
  };
  return block;
}
