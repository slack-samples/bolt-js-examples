import * as assert from "node:assert";
import crypto from "node:crypto";
import { after, afterEach, before, beforeEach, describe, it } from "node:test";
import nock from "nock";
import { AcmeAccounts } from "../src/accounts.js";
import { CONNECT_ACTION_ID, DISCONNECT_ACTION_ID } from "../src/acme.js";
import { createApp } from "../src/app.js";
import { context, installation, temporaryStore } from "./helpers.js";

const SIGNING_SECRET = "test_signing_secret";

describe("app", () => {
  let app;
  let port;
  let installationStore;

  before(async () => {
    process.env.SLACK_CLIENT_ID = "111.222";
    process.env.SLACK_CLIENT_SECRET = "test_client_secret";
    process.env.SLACK_SIGNING_SECRET = SIGNING_SECRET;
    process.env.SLACK_STATE_SECRET = "test_state_secret";
    nock.enableNetConnect("localhost");
    installationStore = temporaryStore();
    app = createApp({ installationStore, baseUrl: "https://acme.example" });
    const server = await app.start(0);
    port = server.address().port;
  });

  beforeEach(async () => {
    await installationStore.storeInstallation(
      installation("U0ADA", { userToken: "xoxp-test-ada" }),
    );
    nock("https://slack.com")
      .persist()
      .post("/api/auth.test")
      .matchHeader("authorization", "Bearer xoxp-test-ada")
      .reply(200, { ok: true, user: "ada", team: "Acme Corp" });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  after(async () => {
    await app.stop();
    delete process.env.SLACK_CLIENT_ID;
    delete process.env.SLACK_CLIENT_SECRET;
    delete process.env.SLACK_SIGNING_SECRET;
    delete process.env.SLACK_STATE_SECRET;
  });

  it("acknowledges Connect clicks", async () => {
    const response = await postAction(port, CONNECT_ACTION_ID);

    assert.strictEqual(response.status, 200);
  });

  it("forgets the account on Disconnect clicks", async () => {
    const slack = expectCalls(
      "apps.user.connection.requestAuth",
      "views.publish",
      "auth.revoke",
    );

    const response = await postAction(port, DISCONNECT_ACTION_ID);
    await waitFor(() => slack.isDone());

    assert.strictEqual(response.status, 200);
    assert.strictEqual(
      await new AcmeAccounts(installationStore).find(context(), "U0ADA"),
      undefined,
    );
  });

  it("publishes App Home when it opens", async () => {
    const slack = expectCalls("views.publish");

    const response = await postEvent(port, {
      type: "app_home_opened",
      user: "U0ADA",
    });
    await waitFor(() => slack.isDone());

    assert.strictEqual(response.status, 200);
  });

  it("answers status requests", async () => {
    let status;
    const slack = nock("https://slack.com")
      .post("/api/apps.user.connection.update", (body) => {
        status = body.status;
        return true;
      })
      .reply(200, { ok: true });

    const response = await postEvent(port, {
      type: "user_connection_status_requested",
      user: "U0ADA",
    });
    await waitFor(() => slack.isDone());

    assert.strictEqual(response.status, 200);
    assert.strictEqual(status, "connected");
  });

  it("forgets users whose tokens were revoked", async () => {
    const slack = expectCalls(
      "apps.user.connection.requestAuth",
      "views.publish",
    );

    const response = await postEvent(port, {
      type: "tokens_revoked",
      tokens: { oauth: ["U0ADA"] },
    });
    await waitFor(() => slack.isDone());

    assert.strictEqual(response.status, 200);
    assert.strictEqual(
      await new AcmeAccounts(installationStore).find(context(), "U0ADA"),
      undefined,
    );
  });

  it("redirects installs straight to Slack with the user scope", async () => {
    const response = await fetch(`http://localhost:${port}/slack/install`, {
      redirect: "manual",
    });

    const location = new URL(`${response.headers.get("location")}`);
    assert.strictEqual(response.status, 302);
    assert.strictEqual(
      location.searchParams.get("user_scope"),
      "users.profile:read",
    );
  });
});

/**
 * @param {...string} methods
 */
function expectCalls(...methods) {
  const slack = nock("https://slack.com");
  for (const method of methods) {
    slack.post(`/api/${method}`).reply(200, { ok: true });
  }
  return slack;
}

/**
 * @param {() => boolean} condition
 */
async function waitFor(condition) {
  const deadline = Date.now() + 2000;
  while (!condition()) {
    assert.ok(Date.now() < deadline, "timed out waiting for the listener");
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}

/**
 * @param {number} port
 * @param {string} actionId
 */
async function postAction(port, actionId) {
  const payload = {
    type: "block_actions",
    api_app_id: "A0001",
    team: { id: "T0001" },
    user: { id: "U0ADA", team_id: "T0001" },
    trigger_id: "123.456.abc",
    actions: [
      {
        type: "button",
        action_id: actionId,
        block_id: "acme",
        action_ts: "1700000000.000001",
      },
    ],
  };
  const body = new URLSearchParams({
    payload: JSON.stringify(payload),
  }).toString();
  return post(port, body, "application/x-www-form-urlencoded");
}

/**
 * @param {number} port
 * @param {object} event
 */
async function postEvent(port, event) {
  const body = JSON.stringify({
    type: "event_callback",
    api_app_id: "A0001",
    team_id: "T0001",
    event,
    event_id: "Ev0001",
    event_time: 1700000000,
  });
  return post(port, body, "application/json");
}

/**
 * @param {number} port
 * @param {string} body
 * @param {string} contentType
 */
async function post(port, body, contentType) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = `v0=${crypto.createHmac("sha256", SIGNING_SECRET).update(`v0:${timestamp}:${body}`).digest("hex")}`;
  return fetch(`http://localhost:${port}/slack/events`, {
    method: "POST",
    headers: {
      "Content-Type": contentType,
      "x-slack-request-timestamp": timestamp,
      "x-slack-signature": signature,
    },
    body,
  });
}
