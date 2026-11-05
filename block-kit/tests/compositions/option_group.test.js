import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/compositions/option_group.js";

describe("option_group", () => {
  it("example01", () => {
    const blocks = example01();
    const expected = [
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
    assert.deepStrictEqual(blocks, expected);
  });
});
