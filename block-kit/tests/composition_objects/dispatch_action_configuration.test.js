import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/composition_objects/dispatch_action_configuration.js";

describe("dispatch_action_configuration", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "input",
      dispatch_action: true,
      element: {
        type: "plain_text_input",
        multiline: true,
        dispatch_action_config: {
          trigger_actions_on: ["on_character_entered"],
        },
      },
      label: {
        type: "plain_text",
        text: "This is a multiline plain-text input",
        emoji: true,
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
