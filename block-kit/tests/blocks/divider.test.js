import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/blocks/divider.js";

describe("divider", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "divider",
    };
    assert.deepStrictEqual(block, expected);
  });
});
