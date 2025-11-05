import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01, example02 } from "../../src/blocks/context_actions.js";

describe("context_actions", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "context_actions",
      elements: [
        {
          type: "feedback_buttons",
          action_id: "feedback_buttons_1",
          positive_button: {
            text: {
              type: "plain_text",
              text: "👍",
            },
            value: "positive_feedback",
          },
          negative_button: {
            text: {
              type: "plain_text",
              text: "👎",
            },
            value: "negative_feedback",
          },
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example02", () => {
    const block = example02();
    const expected = {
      type: "context_actions",
      elements: [
        {
          type: "icon_button",
          icon: "trash",
          text: {
            type: "plain_text",
            text: "Delete",
          },
          action_id: "delete_button_1",
          value: "delete_item",
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
