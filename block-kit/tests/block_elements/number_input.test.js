import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/number_input.js";

describe("number_input", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "input",
      element: {
        type: "number_input",
        is_decimal_allowed: false,
        action_id: "number_input-action",
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
