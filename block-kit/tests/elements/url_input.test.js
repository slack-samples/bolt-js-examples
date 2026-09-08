import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/elements/url_input.js";

describe("url_input", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "input",
      element: {
        type: "url_text_input",
        action_id: "url_text_input-action",
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
