import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/blocks/header.js";

describe("header", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "header",
      text: {
        type: "plain_text",
        text: "A Heartfelt Header",
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
