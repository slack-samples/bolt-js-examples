import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/rich_text_input.js";

describe("rich_text_input", () => {
  it("example01", () => {
    const view = example01();
    const expected = {
      blocks: [
        {
          type: "input",
          element: {
            type: "rich_text_input",
            action_id: "rich_text_input-action",
            dispatch_action_config: {
              trigger_actions_on: ["on_character_entered"],
            },
            focus_on_load: true,
            placeholder: {
              type: "plain_text",
              text: "Enter text",
            },
          },
          label: {
            type: "plain_text",
            text: "Label",
            emoji: true,
          },
        },
      ],
      type: "home",
    };
    assert.deepStrictEqual(view, expected);
  });
});
