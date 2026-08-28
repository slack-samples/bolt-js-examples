import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/overflow_menu.js";

describe("overflow_menu", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "section",
      block_id: "section 890",
      text: {
        type: "mrkdwn",
        text: "This is a section block with an overflow menu.",
      },
      accessory: {
        type: "overflow",
        action_id: "overflow",
        options: [
          {
            text: {
              type: "plain_text",
              text: "*this is plain_text text*",
            },
            value: "value-0",
          },
          {
            text: {
              type: "plain_text",
              text: "*this is plain_text text*",
            },
            value: "value-1",
          },
          {
            text: {
              type: "plain_text",
              text: "*this is plain_text text*",
            },
            value: "value-2",
          },
          {
            text: {
              type: "plain_text",
              text: "*this is plain_text text*",
            },
            value: "value-3",
          },
          {
            text: {
              type: "plain_text",
              text: "*this is plain_text text*",
            },
            value: "value-4",
          },
        ],
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
