import * as assert from "node:assert";
import { describe, it } from "node:test";
import {
  example01,
  example02,
  example03,
  example04,
  example05,
} from "../../src/elements/multi_select_menu.js";

describe("multi_select_menu", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "section",
      block_id: "section678",
      text: {
        type: "mrkdwn",
        text: "Pick items from the list",
      },
      accessory: {
        action_id: "text1234",
        type: "multi_static_select",
        placeholder: {
          type: "plain_text",
          text: "Select items",
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
        text: "Pick items from the list",
      },
      accessory: {
        action_id: "text1234",
        type: "multi_external_select",
        placeholder: {
          type: "plain_text",
          text: "Select items",
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
        text: "Pick users from the list",
      },
      accessory: {
        action_id: "text1234",
        type: "multi_users_select",
        placeholder: {
          type: "plain_text",
          text: "Select users",
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
        text: "Pick conversations from the list",
      },
      accessory: {
        action_id: "text1234",
        type: "multi_conversations_select",
        placeholder: {
          type: "plain_text",
          text: "Select conversations",
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
        text: "Pick channels from the list",
      },
      accessory: {
        action_id: "text1234",
        type: "multi_channels_select",
        placeholder: {
          type: "plain_text",
          text: "Select channels",
        },
      },
    };
    assert.deepStrictEqual(block, expected);
  });
});
