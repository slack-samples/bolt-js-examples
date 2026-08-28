import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/channel.js";

describe("channel", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "channel",
              channel_id: "C123ABC456",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
