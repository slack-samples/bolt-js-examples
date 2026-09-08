import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/elements/radio_buttons.js";

describe("radio_buttons", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "section",
      text: {
        type: "plain_text",
        text: "Check out these rad radio buttons",
      },
      accessory: {
        type: "radio_buttons",
        action_id: "this_is_an_action_id",
        initial_option: {
          value: "A1",
          text: {
            type: "plain_text",
            text: "Radio 1",
          },
        },
        options: [
          {
            value: "A1",
            text: {
              type: "plain_text",
              text: "Radio 1",
            },
          },
          {
            value: "A2",
            text: {
              type: "plain_text",
              text: "Radio 2",
            },
          },
        ],
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
