import * as assert from "node:assert";
import { after, describe, it, mock } from "node:test";

describe("blocks.validate", () => {
  after(() => {
    mock.restoreAll();
  });

  it("sends the expected request", async () => {
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

    await import("../src/blocks-validate.js");

    assert.strictEqual(fetchMock.mock.callCount(), 1);
    const [url, init] = fetchMock.mock.calls[0].arguments;
    assert.ok(init, "fetch was called with a request init");

    assert.strictEqual(String(url), "https://slack.com/api/blocks.validate");

    const params = Object.fromEntries(new URLSearchParams(String(init.body)));
    const expectedBlocks = JSON.stringify([
      { type: "section", text: { type: "plain_text", text: "Hello world" } },
    ]);
    assert.deepStrictEqual(params, {
      blocks: expectedBlocks,
    });
  });
});
