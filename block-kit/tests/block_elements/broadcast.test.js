import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/broadcast.js";

describe("broadcast", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "broadcast",
              range: "everyone",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
