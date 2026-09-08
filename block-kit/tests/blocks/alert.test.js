import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/blocks/alert.js";

describe("alert", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "alert",
      text: {
        type: "mrkdwn",
        text: "The work is mysterious and important.",
        verbatim: false,
      },
      level: "info",
    };
    assert.deepStrictEqual(block, expected);
  });
});
