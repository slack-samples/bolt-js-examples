import * as assert from "node:assert";
import { afterEach, beforeEach, describe, it, mock } from "node:test";
import { app } from "../app.js";
import * as connections from "../src/connections.js";
import { calls, TempConnections } from "./helpers.js";

/**
 * @param {any} body
 */
async function dispatch(body) {
  const ack = mock.fn(async () => {});
  await app.processEvent({ body, ack });
  return ack;
}

/**
 * @param {any} event
 */
function eventCallback(event) {
  return { type: "event_callback", event };
}

/**
 * @param {string} actionId
 * @param {string} value
 */
function buttonClick(actionId, value) {
  return {
    type: "block_actions",
    user: { id: "U0ADA" },
    actions: [{ type: "button", action_id: actionId, value }],
  };
}

describe("app", () => {
  /** @type {TempConnections} */
  let tempConnections;

  beforeEach(() => {
    tempConnections = new TempConnections();
    calls.length = 0;
  });

  afterEach(() => {
    tempConnections.close();
  });

  /**
   * @param {string} method
   */
  function lastCall(method) {
    return calls.findLast(([name]) => name === method)?.[1];
  }

  function sentProvider() {
    return lastCall("apps.user.connection.requestAuth").primary_provider;
  }

  function homeBlock() {
    return lastCall("views.publish").view.blocks.at(-1);
  }

  it("app home opened shows the connection", async () => {
    connections.connect("U0ADA");

    await dispatch(eventCallback({ type: "app_home_opened", user: "U0ADA" }));

    assert.strictEqual(lastCall("views.publish").user_id, "U0ADA");
    assert.strictEqual(homeBlock().is_connected, true);
  });

  it("connect saves and shows the connection", async () => {
    const ack = await dispatch(buttonClick("auth_provider_connect", "acme"));

    assert.strictEqual(ack.mock.callCount(), 1);
    assert.ok(connections.isConnected("U0ADA"));
    assert.strictEqual(sentProvider().is_connected, true);
    assert.strictEqual(homeBlock().is_connected, true);
  });

  it("disconnect forgets and shows the connection", async () => {
    connections.connect("U0ADA");

    const ack = await dispatch(buttonClick("auth_provider_disconnect", "acme"));

    assert.strictEqual(ack.mock.callCount(), 1);
    assert.ok(!connections.isConnected("U0ADA"));
    assert.strictEqual(sentProvider().is_connected, false);
    assert.strictEqual(homeBlock().is_connected, false);
  });

  it("connect ignores another provider", async () => {
    const ack = await dispatch(
      buttonClick("auth_provider_connect", "wile-e-coyote"),
    );

    assert.strictEqual(ack.mock.callCount(), 1);
    assert.ok(!connections.isConnected("U0ADA"));
    assert.deepStrictEqual(calls, []);
  });

  it("disconnect ignores another provider", async () => {
    connections.connect("U0ADA");

    const ack = await dispatch(
      buttonClick("auth_provider_disconnect", "wile-e-coyote"),
    );

    assert.strictEqual(ack.mock.callCount(), 1);
    assert.ok(connections.isConnected("U0ADA"));
    assert.deepStrictEqual(calls, []);
  });

  it("user connection connect opens the modal", async () => {
    await dispatch(
      eventCallback({
        type: "user_connection",
        subtype: "connect",
        user: "U0ADA",
        trigger_id: "123.456.abc",
      }),
    );

    const args = lastCall("apps.user.connection.requestAuth");
    assert.strictEqual(args.trigger_id, "123.456.abc");
    assert.strictEqual(args.primary_provider.is_connected, false);
  });

  it("user connection disconnect is ignored", async () => {
    await dispatch(
      eventCallback({
        type: "user_connection",
        subtype: "disconnect",
        user: "U0ADA",
        trigger_id: "123.456.abc",
      }),
    );

    assert.deepStrictEqual(calls, []);
  });

  it("status requested reports connected users", async () => {
    connections.connect("U0ADA");

    await dispatch(
      eventCallback({
        type: "user_connection_status_requested",
        user: "U0ADA",
      }),
    );

    assert.deepStrictEqual(calls, [
      [
        "apps.user.connection.update",
        { user_id: "U0ADA", status: "connected" },
      ],
    ]);
  });

  it("status requested reports unknown users as disconnected", async () => {
    await dispatch(
      eventCallback({
        type: "user_connection_status_requested",
        user: "U0ADA",
      }),
    );

    assert.deepStrictEqual(calls, [
      [
        "apps.user.connection.update",
        { user_id: "U0ADA", status: "disconnected" },
      ],
    ]);
  });
});
