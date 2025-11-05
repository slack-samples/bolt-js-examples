import * as assert from "node:assert";
import { describe, it } from "node:test";
import {
  example01,
  example02,
  example03,
  example04,
  example05,
  example06,
  example07,
  example08,
  example09,
  example10,
  example11,
  example12,
  example13,
} from "../../src/blocks/rich_text.js";

describe("rich_text", () => {
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

  it("example03", () => {
    const block = example03();
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

  it("example04", () => {
    const block = example04();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_preformatted",
          elements: [
            {
              type: "text",
              text: '{\n  "object": {\n    "description": "this is an example of a json object"\n  }\n}',
            },
          ],
          border: 0,
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example05", () => {
    const block = example05();
    const expected = {
      type: "rich_text",
      block_id: "Vrzsu",
      elements: [
        {
          type: "rich_text_quote",
          elements: [
            {
              type: "text",
              text: "What we need is good examples in our documentation.",
            },
          ],
        },
        {
          type: "rich_text_section",
          elements: [
            {
              type: "text",
              text: "Yes - I completely agree, Luke!",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example06", () => {
    const block = example06();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "broadcast",
              range: "everyone",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example07", () => {
    const block = example07();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "color",
              value: "#F405B3",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example08", () => {
    const block = example08();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "channel",
              channel_id: "C123ABC456",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example09", () => {
    const block = example09();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "date",
              timestamp: 1720710212,
              format: "{date_num} at {time}",
              fallback: "timey",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example10", () => {
    const block = example10();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "emoji",
              name: "basketball",
            },
            {
              type: "text",
              text: " ",
            },
            {
              type: "emoji",
              name: "snowboarder",
            },
            {
              type: "text",
              text: " ",
            },
            {
              type: "emoji",
              name: "checkered_flag",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example11", () => {
    const block = example11();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "link",
              url: "https://api.slack.com",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example12", () => {
    const block = example12();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "user",
              user_id: "U123ABC456",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example13", () => {
    const block = example13();
    const expected = {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "usergroup",
              usergroup_id: "G123ABC456",
            },
          ],
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
