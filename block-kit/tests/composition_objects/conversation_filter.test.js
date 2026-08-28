import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/composition_objects/conversation_filter.js";

describe("conversation_filter", () => {
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
          element: {
            type: "conversations_select",
            placeholder: {
              type: "plain_text",
              text: "Select a conversation",
              emoji: true,
            },
            filter: {
              include: ["public", "mpim"],
              exclude_bot_users: true,
            },
          },
          label: {
            type: "plain_text",
            text: "Choose the conversation to publish your result to:",
            emoji: true,
          },
        },
      ],
    };
    assert.deepStrictEqual(view, expected);
  });
});
