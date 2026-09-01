import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/compositions/text.js";

describe("text", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "A message *with some bold text* and _some italicized text_.",
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
