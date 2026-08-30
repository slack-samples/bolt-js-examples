import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01, example02 } from "../../src/elements/rich_text_list.js";

describe("rich_text_list", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "rich_text",
      block_id: "block1",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "text",
              text: "My favorite Slack features (in no particular order):",
            },
          ],
        },
        {
          type: "rich_text_list",
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Huddles",
                },
              ],
            },
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Canvas",
                },
              ],
            },
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Developing with Block Kit",
                },
              ],
            },
          ],
          style: "bullet",
          indent: 0,
          border: 1,
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example02", () => {
    const block = example02();
    const expected = {
      type: "rich_text",
      block_id: "block1",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "text",
              text: "Breakfast foods I enjoy:",
            },
          ],
        },
        {
          type: "rich_text_list",
          style: "bullet",
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Hashbrowns",
                },
              ],
            },
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Eggs",
                },
              ],
            },
          ],
        },
        {
          type: "rich_text_list",
          style: "bullet",
          indent: 1,
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Scrambled",
                },
              ],
            },
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Over easy",
                },
              ],
            },
          ],
        },
        {
          type: "rich_text_list",
          style: "bullet",
          elements: [
            {
              type: "rich_text_section",
              elements: [
                {
                  type: "text",
                  text: "Pancakes, extra syrup",
                },
              ],
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
