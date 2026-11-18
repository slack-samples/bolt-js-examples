import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/compositions/confirmation_dialog.js";

describe("confirmation_dialog", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: "Approve",
          },
          confirm: {
            title: {
              type: "plain_text",
              text: "Are you sure?",
            },
            text: {
              type: "mrkdwn",
              text: "Would you not prefer a good game of _chess_?",
            },
            confirm: {
              type: "plain_text",
              text: "Do it",
            },
            deny: {
              type: "plain_text",
              text: "Stop, I changed my mind!",
            },
          },
          style: "primary",
          value: "click_me_123",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: "Deny",
          },
          style: "danger",
          value: "click_me_123",
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
