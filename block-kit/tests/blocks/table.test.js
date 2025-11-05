import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/blocks/table.js";

describe("table", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "table",
      column_settings: [
        {
          is_wrapped: true,
        },
        {
          align: "right",
        },
      ],
      rows: [
        [
          {
            type: "raw_text",
            text: "Header A",
          },
          {
            type: "raw_text",
            text: "Header B",
          },
        ],
        [
          {
            type: "raw_text",
            text: "Data 1A",
          },
          {
            type: "rich_text",
            elements: [
              {
                type: "rich_text_section",
                elements: [
                  {
                    text: "Data 1B",
                    type: "link",
                    url: "https://slack.com",
                  },
                ],
              },
            ],
          },
        ],
        [
          {
            type: "raw_text",
            text: "Data 2A",
          },
          {
            type: "rich_text",
            elements: [
              {
                type: "rich_text_section",
                elements: [
                  {
                    text: "Data 2B",
                    type: "link",
                    url: "https://slack.com",
                  },
                ],
              },
            ],
          },
        ],
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
