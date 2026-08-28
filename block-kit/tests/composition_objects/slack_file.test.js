import * as assert from "node:assert";
import { describe, it } from "node:test";
import {
  example01,
  example02,
} from "../../src/composition_objects/slack_file.js";

describe("slack_file", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "image",
      title: {
        type: "plain_text",
        text: "Please enjoy this photo of a kitten",
      },
      block_id: "image4",
      slack_file: {
        url: "https://files.slack.com/files-pri/T0123456-F0123456/xyz.png",
      },
      alt_text: "An incredibly cute kitten.",
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example02", () => {
    const block = example02();
    const expected = {
      type: "image",
      title: {
        type: "plain_text",
        text: "Please enjoy this photo of a kitten",
      },
      block_id: "image4",
      slack_file: {
        id: "F0123456",
      },
      alt_text: "An incredibly cute kitten.",
    };
    assert.deepStrictEqual(block, expected);
  });
});
