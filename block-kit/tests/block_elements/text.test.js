import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/text.js";

describe("text", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "text",
              text: "Hello there, ",
            },
            {
              type: "text",
              text: "I am a bold rich text block!",
              style: {
                bold: true,
              },
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
