import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/elements/rich_text_section.js";

describe("rich_text_section", () => {
  it("example01", () => {
    const blocks = example01();
    const expected = [
      {
        type: "rich_text",
        elements: [
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "Hello there, I am a basic rich text block!",
              },
            ],
          },
        ],
      },
      {
        type: "rich_text",
        elements: [
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "Hello there, ",
              },
              {
                type: "text",
                text: "I am a bold rich text block!",
                style: {
                  bold: true,
                },
              },
            ],
          },
        ],
      },
      {
        type: "rich_text",
        elements: [
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "Hello there, ",
              },
              {
                type: "text",
                text: "I am an italic rich text block!",
                style: {
                  italic: true,
                },
              },
            ],
          },
        ],
      },
      {
        type: "rich_text",
        elements: [
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "Hello there, ",
              },
              {
                type: "text",
                text: "I am a strikethrough rich text block!",
                style: {
                  strike: true,
                },
              },
            ],
          },
        ],
      },
    ];
    assert.deepStrictEqual(blocks, expected);
  });
});
