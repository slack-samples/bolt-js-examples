/**
 * Displays related card blocks in a horizontally-scrolling container.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/carousel-block/}
 */

/**
 * A carousel of cards describing different departments.
 *
 * @returns {import('@slack/types').CarouselBlock}
 */
export function example01() {
  /**
   * @type {import('@slack/types').CarouselBlock}
   */
  const block = {
    type: "carousel",
    elements: [
      {
        type: "card",
        block_id: "carousel-card-1",
        icon: {
          type: "image",
          image_url: "https://picsum.photos/36/36",
          alt_text: "Icon",
        },
        title: {
          type: "mrkdwn",
          text: "MDR",
          verbatim: false,
        },
        subtitle: {
          type: "mrkdwn",
          text: "Refining data files",
          verbatim: false,
        },
        hero_image: {
          type: "image",
          image_url: "https://picsum.photos/400/300",
          alt_text: "Sample hero image",
        },
        body: {
          type: "mrkdwn",
          text: "Blue badge required to gain access.",
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
            action_id: "button_action_1",
          },
        ],
      },
      {
        type: "card",
        block_id: "carousel-card-2",
        icon: {
          type: "image",
          image_url: "https://picsum.photos/36/36",
          alt_text: "Icon",
        },
        title: {
          type: "mrkdwn",
          text: "O&D",
          verbatim: false,
        },
        subtitle: {
          type: "mrkdwn",
          text: "Storage, maintenance, and rotation of art pieces",
          verbatim: false,
        },
        hero_image: {
          type: "image",
          image_url: "https://picsum.photos/400/300",
          alt_text: "Sample hero image",
        },
        body: {
          type: "mrkdwn",
          text: "Green badge required to gain access.",
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
            action_id: "button_action_2",
          },
        ],
      },
      {
        type: "card",
        block_id: "carousel-card-3",
        icon: {
          type: "image",
          image_url: "https://picsum.photos/36/36",
          alt_text: "Icon",
        },
        title: {
          type: "mrkdwn",
          text: "Wellness Center",
          verbatim: false,
        },
        subtitle: {
          type: "mrkdwn",
          text: "Wellness sessions",
          verbatim: false,
        },
        hero_image: {
          type: "image",
          image_url: "https://picsum.photos/400/300",
          alt_text: "Sample hero image",
        },
        body: {
          type: "mrkdwn",
          text: "Please take a seat in the waiting room until called.",
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
            action_id: "button_action_3",
          },
        ],
      },
    ],
  };
  return block;
}

/**
 * A minimal carousel holding a single card with just a title and body.
 *
 * @returns {import('@slack/types').CarouselBlock}
 */
export function example02() {
  /**
   * @type {import('@slack/types').CarouselBlock}
   */
  const block = {
    type: "carousel",
    elements: [
      {
        type: "card",
        title: {
          type: "mrkdwn",
          text: "Severance",
        },
        body: {
          type: "mrkdwn",
          text: "The work is mysterious and important.",
        },
      },
    ],
  };
  return block;
}
