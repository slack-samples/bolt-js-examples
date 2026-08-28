import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/icon_button.js";

describe("icon_button", () => {
  it("example01", () => {
    const block = example01();
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
          action_id: "delete_button",
          value: "delete_item",
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
