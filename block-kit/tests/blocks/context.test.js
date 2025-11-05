import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/blocks/context.js";

describe("context", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "context",
      elements: [
        {
          type: "image",
          image_url:
            "https://image.freepik.com/free-photo/red-drawing-pin_1156-445.jpg",
          alt_text: "images",
        },
        {
          type: "mrkdwn",
          text: "Location: **Dogpatch**",
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
