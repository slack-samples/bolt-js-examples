import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/emoji.js";

describe("emoji", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "emoji",
              name: "basketball",
            },
            {
              type: "text",
              text: " ",
            },
            {
              type: "emoji",
              name: "snowboarder",
            },
            {
              type: "text",
              text: " ",
            },
            {
              type: "emoji",
              name: "checkered_flag",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
