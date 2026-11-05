/**
 * Defines a way to group options in a menu.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/composition-objects/option-group-object/}
 */

/**
 * A static select menu containing the option group object.
 *
 * @returns {(import('@slack/types').SectionBlock | import('@slack/types').DividerBlock)[]}
 */
export function example01() {
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
        option_groups: [
          {
            label: {
              type: "plain_text",
              text: "Group 1",
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
          {
            label: {
              type: "plain_text",
              text: "Group 2",
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "*this is plain_text text*",
                },
                value: "value-3",
              },
            ],
          },
        ],
      },
    },
  ];
  return blocks;
}
