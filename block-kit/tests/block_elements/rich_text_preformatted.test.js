import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/rich_text_preformatted.js";

describe("rich_text_preformatted", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_preformatted",
          elements: [
            {
              type: "text",
              text: '{\n  "object": {\n    "description": "this is an example of a json object"\n  }\n}',
            },
          ],
          border: 0,
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
