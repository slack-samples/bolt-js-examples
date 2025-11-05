import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/blocks/video.js";

describe("video", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "video",
      title: {
        type: "plain_text",
        text: "Use the Events API to create a dynamic App Home",
        emoji: true,
      },
      title_url: "https://www.youtube.com/watch?v=8876OZV_Yy0",
      description: {
        type: "plain_text",
        text: "Slack sure is nifty!",
        emoji: true,
      },
      video_url:
        "https://www.youtube.com/embed/8876OZV_Yy0?feature=oembed&autoplay=1",
      alt_text: "Use the Events API to create a dynamic App Home",
      thumbnail_url: "https://i.ytimg.com/vi/8876OZV_Yy0/hqdefault.jpg",
    };
    assert.deepStrictEqual(block, expected);
  });
});
