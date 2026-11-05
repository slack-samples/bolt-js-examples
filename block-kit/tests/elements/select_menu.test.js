import * as assert from "node:assert";
import { describe, it } from "node:test";
import {
  example01,
  example02,
  example03,
  example04,
  example05,
} from "../../src/elements/select_menu.js";

describe("select_menu", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "section",
      block_id: "section678",
      text: {
        type: "mrkdwn",
        text: "Pick an item from the dropdown list",
      },
      accessory: {
        action_id: "text1234",
        type: "static_select",
        placeholder: {
          type: "plain_text",
          text: "Select an item",
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "*this is plain_text text*",
            },
            value: "value-0",
          },
          {
            text: {
              type: "plain_text",
              text: "*this is plain_text text*",
            },
            value: "value-1",
          },
          {
            text: {
              type: "plain_text",
              text: "*this is plain_text text*",
            },
            value: "value-2",
          },
        ],
      },
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example02", () => {
    const block = example02();
    const expected = {
      type: "section",
      block_id: "section678",
      text: {
        type: "mrkdwn",
        text: "Pick an item from the dropdown list",
      },
      accessory: {
        action_id: "text1234",
        type: "external_select",
        placeholder: {
          type: "plain_text",
          text: "Select an item",
        },
        min_query_length: 3,
      },
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example03", () => {
    const block = example03();
    const expected = {
      type: "section",
      block_id: "section678",
      text: {
        type: "mrkdwn",
        text: "Pick a user from the dropdown list",
      },
      accessory: {
        action_id: "text1234",
        type: "users_select",
        placeholder: {
          type: "plain_text",
          text: "Select an item",
        },
      },
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example04", () => {
    const block = example04();
    const expected = {
      type: "section",
      block_id: "section678",
      text: {
        type: "mrkdwn",
        text: "Pick a conversation from the dropdown list",
      },
      accessory: {
        action_id: "text1234",
        type: "conversations_select",
        placeholder: {
          type: "plain_text",
          text: "Select an item",
        },
      },
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example05", () => {
    const block = example05();
    const expected = {
      type: "section",
      block_id: "section678",
      text: {
        type: "mrkdwn",
        text: "Pick a channel from the dropdown list",
      },
      accessory: {
        action_id: "text1234",
        type: "channels_select",
        placeholder: {
          type: "plain_text",
          text: "Select an item",
        },
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
