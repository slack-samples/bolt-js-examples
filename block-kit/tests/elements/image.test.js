import * as assert from "node:assert";
import { describe, it } from "node:test";
import {
  example01,
  example02,
  example03,
} from "../../src/elements/image.js";

describe("image", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "section",
      block_id: "section567",
      text: {
        type: "mrkdwn",
        text: "This is a section block with an accessory image.",
      },
      accessory: {
        type: "image",
        image_url:
          "https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg",
        alt_text: "cute cat",
      },
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example02", () => {
    const block = example02();
    const expected = {
      type: "section",
      block_id: "section567",
      text: {
        type: "mrkdwn",
        text: "This is a section block with an accessory image.",
      },
      accessory: {
        type: "image",
        slack_file: {
          url: "https://files.slack.com/files-pri/T0123456-F0123456/xyz.png",
        },
        alt_text: "Slack file object.",
      },
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example03", () => {
    const block = example03();
    const expected = {
      type: "section",
      block_id: "section567",
      text: {
        type: "mrkdwn",
        text: "This is a section block with an accessory image.",
      },
      accessory: {
        type: "image",
        slack_file: {
          id: "F01234567",
        },
        alt_text: "Slack file object.",
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
