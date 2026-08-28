import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/email_input.js";

describe("email_input", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "input",
      block_id: "input123",
      label: {
        type: "plain_text",
        text: "Email Address",
      },
      element: {
        type: "email_text_input",
        action_id: "email_text_input-action",
        placeholder: {
          type: "plain_text",
          text: "Enter an email",
        },
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
