import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/elements/time_picker.js";

describe("time_picker", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "section",
      block_id: "section1234",
      text: {
        type: "mrkdwn",
        text: "Pick a date for the deadline.",
      },
      accessory: {
        type: "timepicker",
        timezone: "America/Los_Angeles",
        action_id: "timepicker123",
        initial_time: "11:40",
        placeholder: {
          type: "plain_text",
          text: "Select a time",
        },
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
