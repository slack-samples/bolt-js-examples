import * as assert from "node:assert";
import { after, describe, it, mock } from "node:test";

describe("chat.postMessage", () => {
  // Restore the patched global fetch once the suite finishes.
  after(() => {
    mock.restoreAll();
  });

  it("sends the expected request", async () => {
    process.env.SLACK_TOKEN = "xoxb-test";

    // @slack/web-api v8 calls the native global fetch. Stub it and return a
    // minimal successful Slack response so the SDK resolves cleanly.
    const fetchMock = mock.method(
      globalThis,
      "fetch",
      async () =>
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
    );

    // The example fires its API call as a side effect on import.
    await import("../src/chat-post-message.js");

    assert.strictEqual(fetchMock.mock.callCount(), 1);
    const [url, init] = fetchMock.mock.calls[0].arguments;
    assert.ok(init, "fetch was called with a request init");

    // Exact URL — pins the method endpoint.
    assert.strictEqual(String(url), "https://slack.com/api/chat.postMessage");

    // Exact body — decode the url-encoded form and deep-equal the payload.
    const params = Object.fromEntries(new URLSearchParams(String(init.body)));
    assert.deepStrictEqual(params, {
      channel: "C123ABC456",
      text: "Here's a message for you",
    });
  });
});
