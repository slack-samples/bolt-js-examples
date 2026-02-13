import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/blocks/task_card.js";

describe("task_card", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "task_card",
      task_id: "task_1",
      title: "Fetching weather data",
      status: "pending",
      output: {
        type: "rich_text",
        elements: [
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "Found weather data for Chicago from 2 sources",
              },
            ],
          },
        ],
      },
      sources: [
        {
          type: "url",
          url: "https://weather.com/",
          text: "weather.com",
        },
        {
          type: "url",
          url: "https://www.accuweather.com/",
          text: "accuweather.com",
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
