import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/block_elements/file_input.js";

describe("file_input", () => {
  it("example01", () => {
    const view = example01();
    const expected = {
      title: {
        type: "plain_text",
        text: "My App",
        emoji: true,
      },
      submit: {
        type: "plain_text",
        text: "Submit",
        emoji: true,
      },
      type: "modal",
      close: {
        type: "plain_text",
        text: "Cancel",
        emoji: true,
      },
      blocks: [
        {
          type: "input",
          block_id: "input_block_id",
          label: {
            type: "plain_text",
            text: "Upload Files",
          },
          element: {
            type: "file_input",
            action_id: "file_input_action_id_1",
            filetypes: ["jpg", "png"],
            max_files: 5,
          },
        },
      ],
    };
    assert.deepStrictEqual(view, expected);
  });
});
