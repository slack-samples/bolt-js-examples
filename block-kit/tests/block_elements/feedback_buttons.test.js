import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/feedback_buttons.js";

describe("feedback_buttons", () => {
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
              text: "Good",
            },
            value: "positive_feedback",
            accessibility_label: "Mark this response as good",
          },
          negative_button: {
            text: {
              type: "plain_text",
              text: "Bad",
            },
            value: "negative_feedback",
            accessibility_label: "Mark this response as bad",
          },
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
