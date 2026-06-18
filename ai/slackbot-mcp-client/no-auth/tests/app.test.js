import * as assert from "node:assert";
import crypto from "node:crypto";
import { after, before, describe, it } from "node:test";
import nock from "nock";

const SIGNING_SECRET = "test_signing_secret_for_testing";

describe("mcp", () => {
  let app;
  let port;

  before(async () => {
    process.env.SLACK_BOT_TOKEN = "xoxb-test-token";
    process.env.SLACK_SIGNING_SECRET = SIGNING_SECRET;

    nock("https://slack.com")
      .post("/api/auth.test")
      .reply(200, { ok: true, bot_id: "B0101", user_id: "U0123" });

    const mod = await import("../src/app.js");
    app = mod.app;
    const server = await app.start(0);
    port = server.address().port;
  });

  after(async () => {
    await app.stop();
    delete process.env.SLACK_BOT_TOKEN;
    delete process.env.SLACK_SIGNING_SECRET;
  });

  it("returns tool call results", async () => {
    const initBody = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: { name: "test-client", version: "1.0.0" },
      },
    });

    const initSig = signRequest(initBody);
    const initRes = await fetch(`http://localhost:${port}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        "x-slack-request-timestamp": initSig.timestamp,
        "x-slack-signature": initSig.signature,
      },
      body: initBody,
    });
    assert.strictEqual(initRes.status, 200);

    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "roll_dice",
        arguments: { sides: 6, count: 2 },
      },
    });

    const sig = signRequest(body);
    const res = await fetch(`http://localhost:${port}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        "x-slack-request-timestamp": sig.timestamp,
        "x-slack-signature": sig.signature,
      },
      body,
    });
    assert.strictEqual(res.status, 200);

    const text = await res.text();
    const json = parseSSE(text);
    const content = json.result.content[0].text;

    assert.ok(content.includes("Rolled 2d6:"));
  });

  it("rejects unsigned requests", async () => {
    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name: "roll_dice", arguments: {} },
    });

    const res = await fetch(`http://localhost:${port}/mcp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    assert.strictEqual(res.status, 401);
  });
});

function parseSSE(text) {
  const lines = text.split("\n");
  for (const line of lines) {
    if (line.startsWith("data: ")) {
      return JSON.parse(line.slice(6));
    }
  }
  throw new Error("No data event found in SSE response");
}

function signRequest(body) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const sigBasestring = `v0:${timestamp}:${body}`;
  const signature = `v0=${crypto.createHmac("sha256", SIGNING_SECRET).update(sigBasestring).digest("hex")}`;
  return { timestamp, signature };
}
