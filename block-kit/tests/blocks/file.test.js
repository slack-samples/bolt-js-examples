import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/blocks/file.js";

describe("file", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "file",
      external_id: "ABCD1",
      source: "remote",
    };
    assert.deepStrictEqual(block, expected);
  });
});
