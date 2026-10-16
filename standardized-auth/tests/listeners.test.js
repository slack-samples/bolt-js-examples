import * as assert from "node:assert";
import { afterEach, describe, it } from "node:test";
import nock from "nock";
import { AcmeAccounts } from "../src/accounts.js";
import { acmeProvider, homeView } from "../src/acme.js";
import { createListeners } from "../src/listeners.js";
import {
  context,
  installation,
  stubClient,
  temporaryStore,
} from "./helpers.js";

const AUTH_URL = "https://acme.example/slack/install";
const ADA = { identity: "@ada", context: "Acme Corp" };

/**
 * @param {import("@slack/oauth").InstallationStore} store
 */
function listenersFor(store) {
  return createListeners(new AcmeAccounts(store), AUTH_URL);
}

/**
 * @param {string} subtype
 */
function userConnection(subtype) {
  return {
    type: "user_connection",
    subtype,
    user: { id: "U0ADA", team_id: "T0001" },
    trigger_id: "123.456.abc",
  };
}

function recordAck() {
  const ack = async () => {
    ack.calls += 1;
  };
  ack.calls = 0;
  return ack;
}

describe("listeners", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("records a new connection then refreshes App Home", async () => {
    let primaryProvider;
    const slack = nock("https://slack.com")
      .post("/api/auth.test")
      .matchHeader("authorization", "Bearer xoxp-test-ada")
      .reply(200, { ok: true, user: "ada", team: "Acme Corp" })
      .post("/api/apps.user.connection.requestAuth", (body) => {
        primaryProvider = JSON.parse(body.primary_provider);
        return true;
      })
      .reply(200, { ok: true })
      .post("/api/views.publish")
      .reply(200, { ok: true });

    await listenersFor(temporaryStore()).reportConnected(
      installation("U0ADA", { userToken: "xoxp-test-ada" }),
    );

    assert.ok(slack.isDone());
    assert.deepStrictEqual(primaryProvider, acmeProvider(AUTH_URL, ADA));
  });

  it("shows a connected account in App Home", async () => {
    const store = temporaryStore();
    await store.storeInstallation(
      installation("U0ADA", { userToken: "xoxp-test-ada" }),
    );
    const client = stubClient();

    await listenersFor(store).publishHome({
      client,
      context: context(),
      event: { user: "U0ADA" },
    });

    assert.deepStrictEqual(client.calls, [
      ["auth.test", { token: "xoxp-test-ada" }],
      [
        "views.publish",
        { user_id: "U0ADA", view: homeView(acmeProvider(AUTH_URL, ADA)) },
      ],
    ]);
  });

  it("offers to connect users without an account in App Home", async () => {
    const client = stubClient();

    await listenersFor(temporaryStore()).publishHome({
      client,
      context: context(),
      event: { user: "U0ADA" },
    });

    assert.deepStrictEqual(client.calls, [
      [
        "views.publish",
        {
          user_id: "U0ADA",
          view: homeView(acmeProvider(AUTH_URL, undefined)),
        },
      ],
    ]);
  });

  it("acknowledges Connect clicks and leaves the sign in to the auth url", async () => {
    const ack = recordAck();

    await listenersFor(temporaryStore()).acknowledgeConnect({ ack });

    assert.strictEqual(ack.calls, 1);
  });

  it("forgets, reports, then revokes on Disconnect", async () => {
    const store = temporaryStore();
    await store.storeInstallation(
      installation("U0ADA", { userToken: "xoxp-test-ada" }),
    );
    const client = stubClient();
    const ack = recordAck();

    await listenersFor(store).acknowledgeDisconnect({
      ack,
      body: { user: { id: "U0ADA" } },
      client,
      context: context(),
    });

    const disconnected = acmeProvider(AUTH_URL, undefined);
    assert.strictEqual(ack.calls, 1);
    assert.strictEqual(
      await new AcmeAccounts(store).find(context(), "U0ADA"),
      undefined,
    );
    assert.deepStrictEqual(client.calls, [
      [
        "apps.user.connection.requestAuth",
        { user_id: "U0ADA", primary_provider: disconnected },
      ],
      ["views.publish", { user_id: "U0ADA", view: homeView(disconnected) }],
      ["auth.revoke", { token: "xoxp-test-ada" }],
    ]);
  });

  it("still reports users without an account as disconnected", async () => {
    const client = stubClient();

    await listenersFor(temporaryStore()).acknowledgeDisconnect({
      ack: recordAck(),
      body: { user: { id: "U0ADA" } },
      client,
      context: context(),
    });

    assert.deepStrictEqual(
      client.calls.map(([method]) => method),
      ["apps.user.connection.requestAuth", "views.publish"],
    );
  });

  it("answers status requests for connected users", async () => {
    const store = temporaryStore();
    await store.storeInstallation(
      installation("U0ADA", { userToken: "xoxp-test-ada" }),
    );
    const client = stubClient();

    await listenersFor(store).answerStatusRequest({
      client,
      context: context(),
      event: { type: "user_connection_status_requested", user: "U0ADA" },
    });

    assert.deepStrictEqual(client.calls, [
      [
        "apps.user.connection.update",
        { user_id: "U0ADA", status: "connected" },
      ],
    ]);
  });

  it("answers status requests for users without an account as disconnected", async () => {
    const client = stubClient();

    await listenersFor(temporaryStore()).answerStatusRequest({
      client,
      context: context(),
      event: { type: "user_connection_status_requested", user: "U0ADA" },
    });

    assert.deepStrictEqual(client.calls, [
      [
        "apps.user.connection.update",
        { user_id: "U0ADA", status: "disconnected" },
      ],
    ]);
  });

  it("forgets users whose tokens were revoked and reports them disconnected", async () => {
    const store = temporaryStore();
    await store.storeInstallation(
      installation("U0ADA", { userToken: "xoxp-test-ada" }),
    );
    const client = stubClient();

    await listenersFor(store).forgetRevokedUsers({
      client,
      context: context(),
      event: { type: "tokens_revoked", tokens: { oauth: ["U0ADA"] } },
    });

    assert.strictEqual(
      await new AcmeAccounts(store).find(context(), "U0ADA"),
      undefined,
    );
    assert.deepStrictEqual(
      client.calls.map(([method]) => method),
      ["apps.user.connection.requestAuth", "views.publish"],
    );
  });

  it("ignores revoked bot tokens", async () => {
    const client = stubClient();

    await listenersFor(temporaryStore()).forgetRevokedUsers({
      client,
      context: context(),
      event: { type: "tokens_revoked", tokens: { bot: ["U0BOT"] } },
    });

    assert.deepStrictEqual(client.calls, []);
  });

  it("opens the auth modal for user_connection connect requests", async () => {
    const client = stubClient();
    const ack = recordAck();

    await listenersFor(temporaryStore()).handleUserConnection({
      ack,
      body: userConnection("connect"),
      client,
      context: context(),
    });

    assert.strictEqual(ack.calls, 1);
    assert.deepStrictEqual(client.calls, [
      [
        "apps.user.connection.requestAuth",
        {
          trigger_id: "123.456.abc",
          primary_provider: acmeProvider(AUTH_URL, undefined),
        },
      ],
    ]);
  });

  it("shows an existing connection in the auth modal", async () => {
    const store = temporaryStore();
    await store.storeInstallation(
      installation("U0ADA", { userToken: "xoxp-test-ada" }),
    );
    const client = stubClient();

    await listenersFor(store).handleUserConnection({
      ack: recordAck(),
      body: userConnection("connect"),
      client,
      context: context(),
    });

    assert.deepStrictEqual(client.calls.at(-1), [
      "apps.user.connection.requestAuth",
      {
        trigger_id: "123.456.abc",
        primary_provider: acmeProvider(AUTH_URL, ADA),
      },
    ]);
  });

  it("forgets the account for user_connection disconnect requests", async () => {
    const store = temporaryStore();
    await store.storeInstallation(
      installation("U0ADA", { userToken: "xoxp-test-ada" }),
    );
    const client = stubClient();
    const ack = recordAck();

    await listenersFor(store).handleUserConnection({
      ack,
      body: userConnection("disconnect"),
      client,
      context: context(),
    });

    assert.strictEqual(ack.calls, 1);
    assert.strictEqual(
      await new AcmeAccounts(store).find(context(), "U0ADA"),
      undefined,
    );
    assert.deepStrictEqual(client.calls.at(-1), [
      "auth.revoke",
      { token: "xoxp-test-ada" },
    ]);
  });

  it("only acknowledges user_connection requests with other subtypes", async () => {
    const client = stubClient();
    const ack = recordAck();

    await listenersFor(temporaryStore()).handleUserConnection({
      ack,
      body: userConnection("reconnect"),
      client,
      context: context(),
    });

    assert.strictEqual(ack.calls, 1);
    assert.deepStrictEqual(client.calls, []);
  });
});
