import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/elements/rich_text_quote.js";

describe("rich_text_quote", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "rich_text",
      block_id: "Vrzsu",
      elements: [
        {
          type: "rich_text_quote",
          elements: [
            {
              type: "text",
              text: "What we need is good examples in our documentation.",
            },
          ],
        },
        {
          type: "rich_text_section",
          elements: [
            {
              type: "text",
              text: "Yes - I completely agree, Luke!",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
