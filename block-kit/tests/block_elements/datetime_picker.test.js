import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/datetime_picker.js";

describe("datetime_picker", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "input",
      element: {
        type: "datetimepicker",
        action_id: "datetimepicker-action",
      },
      hint: {
        type: "plain_text",
        text: "This is some hint text",
        emoji: true,
      },
      label: {
        type: "plain_text",
        text: "Start date",
        emoji: true,
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
