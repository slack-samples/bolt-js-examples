import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/date_picker.js";

describe("date_picker", () => {
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
        type: "datepicker",
        action_id: "datepicker123",
        initial_date: "1990-04-28",
        placeholder: {
          type: "plain_text",
          text: "Select a date",
        },
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
