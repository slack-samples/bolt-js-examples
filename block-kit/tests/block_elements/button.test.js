import * as assert from "node:assert";
import { describe, it } from "node:test";
import {
  example01,
  example02,
  example03,
  example05,
} from "../../src/block_elements/button.js";

describe("button", () => {
  it("example01", () => {
    const element = example01();
    const expected = {
      type: "button",
      text: {
        type: "plain_text",
        text: "Click Me",
      },
      value: "click_me_123",
      action_id: "button",
    };
    assert.deepStrictEqual(element, expected);
  });

  it("example02", () => {
    const element = example02();
    const expected = {
      type: "button",
      text: {
        type: "plain_text",
        text: "Save",
      },
      style: "primary",
      value: "click_me_123",
      action_id: "button",
    };
    assert.deepStrictEqual(element, expected);
  });

  it("example03", () => {
    const element = example03();
    const expected = {
      type: "button",
      text: {
        type: "plain_text",
        text: "Link Button",
      },
      url: "https://docs.slack.dev/block-kit",
    };
    assert.deepStrictEqual(element, expected);
  });

  it("example05", () => {
    const blocks = example05();
    const expected = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "This is a section block with a button.",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me",
          },
          value: "click_me_123",
          action_id: "button",
        },
      },
      {
        type: "actions",
        block_id: "actionblock789",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Primary Button",
            },
            style: "primary",
            value: "click_me_456",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Link Button",
            },
            url: "https://api.slack.com/block-kit",
          },
        ],
      },
    ];
    assert.deepStrictEqual(blocks, expected);
  });
});
