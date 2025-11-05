import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/blocks/markdown.js";

describe("markdown", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "markdown",
      text: "**Lots of information here!!**",
    };
    assert.deepStrictEqual(block, expected);
  });
});
