import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01, example02 } from "../../src/blocks/card.js";

describe("card", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "card",
      icon: {
        type: "image",
        image_url: "https://picsum.photos/36/36",
        alt_text: "Icon",
      },
      title: {
        type: "mrkdwn",
        text: "Lumon Industries",
        verbatim: false,
      },
      subtitle: {
        type: "mrkdwn",
        text: "Committed to work-life balance",
        verbatim: false,
      },
      hero_image: {
        type: "image",
        image_url: "https://picsum.photos/400/300",
        alt_text: "Sample hero image",
      },
      body: {
        type: "mrkdwn",
        text: "Please enjoy each card equally.",
        verbatim: false,
      },
      actions: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Action Button",
            emoji: false,
          },
          action_id: "button_action",
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });

  it("example02", () => {
    const block = example02();
    const expected = {
      type: "card",
      title: {
        type: "mrkdwn",
        text: "Pick your refinement number",
      },
      actions: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Refine",
          },
          action_id: "refine_action",
        },
      ],
    };
    assert.deepStrictEqual(block, expected);
  });
});
