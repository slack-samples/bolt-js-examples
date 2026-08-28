import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/color.js";

describe("color", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "color",
              value: "#F405B3",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
