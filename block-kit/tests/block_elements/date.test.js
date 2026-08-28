import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/date.js";

describe("date", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "date",
              timestamp: 1720710212,
              format: "{date_num} at {time}",
              fallback: "timey",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
