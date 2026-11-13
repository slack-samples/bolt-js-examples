import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/elements/checkboxes.js";

describe("checkboxes", () => {
  it("example01", () => {
    const view = example01();
    const expected = {
      type: "modal",
      title: {
        type: "plain_text",
        text: "My App",
        emoji: true,
      },
      submit: {
        type: "plain_text",
        text: "Submit",
        emoji: true,
      },
      close: {
        type: "plain_text",
        text: "Cancel",
        emoji: true,
      },
      blocks: [
        {
          type: "section",
          text: {
            type: "plain_text",
            text: "Check out these charming checkboxes",
          },
          accessory: {
            type: "checkboxes",
            action_id: "this_is_an_action_id",
            initial_options: [
              {
                value: "A1",
                text: {
                  type: "plain_text",
                  text: "Checkbox 1",
                },
              },
            ],
            options: [
              {
                value: "A1",
                text: {
                  type: "plain_text",
                  text: "Checkbox 1",
                },
              },
              {
                value: "A2",
                text: {
                  type: "plain_text",
                  text: "Checkbox 2",
                },
                description: {
                  type: "mrkdwn",
                  text: "*A description of option two*",
                },
              },
            ],
          },
        },
      ],
    };
    assert.deepStrictEqual(view, expected);
  });
});
