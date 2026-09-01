import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/elements/team.js";

describe("team", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "team",
              team_id: "T123ABC456",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
