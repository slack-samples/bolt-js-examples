import * as assert from "node:assert";
import crypto from "node:crypto";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { after, before, describe, it } from "node:test";
import nock from "nock";

const SIGNING_SECRET = "test_signing_secret_for_testing";
const TEAM_ID = "T0001";
const USER_ID = "U0001";
const BOT_TOKEN = "xoxb-test-bot-token";

describe("mcp", () => {
  let app;
  let port;

  before(async () => {
    process.env.SLACK_CLIENT_ID = "111.222";
    process.env.SLACK_CLIENT_SECRET = "test_client_secret";
    process.env.SLACK_SIGNING_SECRET = SIGNING_SECRET;
    process.env.SLACK_STATE_SECRET = "test_state_secret";
    process.env.BASE_URL = "http://localhost:3000";

    mkdirSync(`./installations/${TEAM_ID}`, { recursive: true });
    writeFileSync(
      `./installations/${TEAM_ID}/app-latest`,
      JSON.stringify({
        team: { id: TEAM_ID },
        user: { id: USER_ID, token: "xoxp-user" },
        bot: { id: "B0001", token: BOT_TOKEN, userId: "U0002" },
      }),
    );

    nock("https://slack.com")
      .post("/api/users.info")
      .reply(200, {
        ok: true,
        user: {
          id: USER_ID,
          profile: {
            real_name: "Test User",
            title: "VIP",
            email: "test@example.com",
            image_72: "https://avatars.slack-edge.com/2026-01-01/123456_abc123def456_72.jpg",
          },
        },
      });

    const mod = await import("../src/app.js");
    app = mod.app;
    const server = await app.start(0);
    port = server.address().port;
  });

  after(async () => {
    await app.stop();
    rmSync("./installations", { recursive: true, force: true });
    delete process.env.SLACK_CLIENT_ID;
    delete process.env.SLACK_CLIENT_SECRET;
    delete process.env.SLACK_SIGNING_SECRET;
    delete process.env.SLACK_STATE_SECRET;
    delete process.env.BASE_URL;
  });

  it("returns tool call response", async () => {
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
        name: "get_profile_card",
        arguments: {
          user_id: USER_ID,
        },
        _meta: {
          slack: {
            user_id: USER_ID,
            team_id: TEAM_ID,
          },
        },
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

    assert.ok(content.includes("Test User"));
    assert.ok(content.includes("VIP"));
    assert.ok(content.includes("test@example.com"));

    const blocks = json.result._meta.slack.blocks;
    assert.strictEqual(blocks[0].type, "card");
    assert.strictEqual(blocks[0].title.text, "Test User");
    assert.strictEqual(blocks[0].subtitle.text, "VIP");
  });

  it("requires team installation", async () => {
    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "get_profile_card",
        arguments: {
          user_id: "U9999",
        },
        _meta: {
          slack: {
            user_id: "U9999",
            team_id: "T9999",
          },
        },
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

    assert.ok(content.includes("not installed"));

    const blocks = json.result._meta.slack.blocks;
    assert.strictEqual(blocks[0].type, "section");
    assert.ok(blocks[0].accessory.url.includes("/slack/install"));
  });

  it("rejects unsigned requests", async () => {
    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name: "get_profile_card", arguments: { user_id: "U999" } },
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
