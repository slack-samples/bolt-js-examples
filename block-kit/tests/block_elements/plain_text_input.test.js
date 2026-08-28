import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/plain_text_input.js";

describe("plain_text_input", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "input",
      element: {
        type: "plain_text_input",
        action_id: "plain_text_input-action",
      },
      label: {
        type: "plain_text",
        text: "Label",
        emoji: true,
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
