import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01, example02 } from "../../src/elements/url_source.js";

describe("url_source", () => {
  it("example01", () => {
    const element = example01();
    const expected = {
      type: "url",
      url: "https://docs.slack.dev/",
      text: "Slack API docs",
    };
    assert.deepStrictEqual(element, expected);
  });

  it("example02", () => {
    const block = example02();
    const expected = {
      type: "task_card",
      task_id: "task_1",
      title: "Scientific findings",
      status: "complete",
      sources: [
        {
          type: "url",
          url: "https://docs.example.com/",
          text: "Tracy's delightful docs",
        },
        {
          type: "url",
          url: "https://research.example.com/",
          text: "Haley's resourceful research",
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
