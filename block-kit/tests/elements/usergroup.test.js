import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/elements/usergroup.js";

describe("usergroup", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "usergroup",
              usergroup_id: "G123ABC456",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
