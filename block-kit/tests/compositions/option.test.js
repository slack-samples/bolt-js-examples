import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01, example02 } from "../../src/compositions/option.js";

describe("option", () => {
  it("example01", () => {
    const option = example01();
    const expected = {
      text: {
        type: "plain_text",
        emoji: true,
        text: "Save it",
      },
      value: "value-2",
    };
    assert.deepStrictEqual(option, expected);
  });

  it("example02", () => {
    const blocks = example02();
    const expected = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":mag: Search results for *Cata*",
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*<fakeLink.toYourApp.com|Use Case Catalogue>*\nUse Case Catalogue for the following departments/roles...",
        },
        accessory: {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            emoji: true,
            text: "Manage",
          },
          options: [
            {
              text: {
                type: "plain_text",
                emoji: true,
                text: "Edit it",
              },
              value: "value-0",
            },
            {
              text: {
                type: "plain_text",
                emoji: true,
                text: "Read it",
              },
              value: "value-1",
            },
            {
              text: {
                type: "plain_text",
                emoji: true,
                text: "Save it",
              },
              value: "value-2",
            },
          ],
        },
      },
    ];
    assert.deepStrictEqual(blocks, expected);
  });
});
