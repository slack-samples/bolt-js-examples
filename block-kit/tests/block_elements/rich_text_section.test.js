import * as assert from "node:assert";
import { describe, it } from "node:test";
import {
  example01,
  example02,
  example03,
  example04,
} from "../../src/block_elements/rich_text_section.js";

describe("rich_text_section", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
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
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example02", () => {
    const block = example02();
    const expected = {
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
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example03", () => {
    const block = example03();
    const expected = {
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
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example04", () => {
    const block = example04();
    const expected = {
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
    };
    assert.deepStrictEqual(block, expected);
  });
});
