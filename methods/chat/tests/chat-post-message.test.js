import * as assert from "node:assert";
import { after, describe, it, mock } from "node:test";

describe("chat.postMessage", () => {
  after(() => {
    mock.restoreAll();
  });

  it("sends", async () => {
    process.env.SLACK_TOKEN = "xoxb-test";

    const fetchMock = mock.method(
      globalThis,
      "fetch",
      async () =>
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
    );

    await import("../src/chat-post-message.js");

    assert.strictEqual(fetchMock.mock.callCount(), 1);
    const [url, init] = fetchMock.mock.calls[0].arguments;

    assert.strictEqual(String(url), "https://slack.com/api/chat.postMessage");

    assert.ok(init);
    assert.deepStrictEqual(
      Object.fromEntries(new URLSearchParams(String(init.body))),
      {
        channel: "C123ABC456",
        text: "Here's a message for you",
      },
    );
  });
});
