import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/blocks/data_table.js";

describe("data_table", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "data_table",
      caption: "A Fabulous Table",
      rows: [
        [
          { type: "raw_text", text: "Name" },
          { type: "raw_text", text: "Department" },
          { type: "raw_text", text: "Badge" },
        ],
        [
          { type: "raw_text", text: "Data Refinement Department" },
          { type: "raw_text", text: "MDR" },
          {
            type: "rich_text",
            elements: [
              {
                type: "rich_text_section",
                elements: [
                  { type: "text", text: "Blue", style: { bold: true } },
                ],
              },
            ],
          },
        ],
        [
          { type: "raw_text", text: "Art Sourcing Department" },
          { type: "raw_text", text: "O&D" },
          {
            type: "rich_text",
            elements: [
              {
                type: "rich_text_section",
                elements: [
                  { type: "text", text: "Green" },
                  { type: "text", text: "review", style: { italic: true } },
                ],
              },
            ],
          },
        ],
        [
          { type: "raw_text", text: "Wellness Department" },
          { type: "raw_text", text: "Wellness Center" },
          {
            type: "rich_text",
            elements: [
              {
                type: "rich_text_section",
                elements: [
                  { type: "text", text: "Limited", style: { bold: true } },
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
