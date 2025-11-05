import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01, example02, example03 } from "../../src/blocks/section.js";

describe("section", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "A message *with some bold text* and _some italicized text_.",
      },
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example02", () => {
    const block = example02();
    const expected = {
      type: "section",
      text: {
        text: "A message *with some bold text* and _some italicized text_.",
        type: "mrkdwn",
      },
      fields: [
        {
          type: "mrkdwn",
          text: "High",
        },
        {
          type: "plain_text",
          emoji: true,
          text: "Silly",
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example03", () => {
    const block = example03();
    const expected = {
      type: "section",
      text: {
        text: "*Haley* has requested you set a deadline for finding a house",
        type: "mrkdwn",
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
