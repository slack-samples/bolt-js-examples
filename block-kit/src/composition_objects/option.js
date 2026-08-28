/**
 * Defines a single item in a number of item selection elements.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/option-object/}
 */

/**
 * A single option object.
 *
 * @returns {import('@slack/types').Option}
 */
export function example01() {
  /**
   * @type {import('@slack/types').Option}
   */
  const option = {
    text: {
      type: "plain_text",
      emoji: true,
      text: "Save it",
    },
    value: "value-2",
  };
  return option;
}

/**
 * Options hosted in a static select menu accessory across a search result layout.
 *
 * @returns {(import('@slack/types').SectionBlock | import('@slack/types').DividerBlock)[]}
 */
export function example02() {
  /**
   * @type {(import('@slack/types').SectionBlock | import('@slack/types').DividerBlock)[]}
   */
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":mag: Search results for *Cata*",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*<fakeLink.toYourApp.com|Use Case Catalogue>*\nUse Case Catalogue for the following departments/roles...",
      },
      accessory: {
        type: "static_select",
        placeholder: {
          type: "plain_text",
          emoji: true,
          text: "Manage",
        },
        options: [
          {
            text: {
              type: "plain_text",
              emoji: true,
              text: "Edit it",
            },
            value: "value-0",
          },
          {
            text: {
              type: "plain_text",
              emoji: true,
              text: "Read it",
            },
            value: "value-1",
          },
          {
            text: {
              type: "plain_text",
              emoji: true,
              text: "Save it",
            },
            value: "value-2",
          },
        ],
      },
    },
  ];
  return blocks;
}
