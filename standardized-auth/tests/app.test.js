import * as assert from "node:assert";
import { afterEach, beforeEach, describe, it, mock } from "node:test";
import {
  appHomeOpenedCallback,
  connectCallback,
  disconnectCallback,
  userConnectionCallback,
  userConnectionStatusRequestedCallback,
} from "../app.js";
import * as connections from "../src/connections.js";
import { mockClient, TempConnections } from "./helpers.js";

/**
 * @param {string} value
 */
function buttonClick(value) {
  return { user: { id: "U0ADA" }, actions: [{ value }] };
}

describe("app", () => {
  /** @type {TempConnections} */
  let tempConnections;
  /** @type {any} */
  let ack;
  /** @type {any} */
  let client;

  beforeEach(() => {
    tempConnections = new TempConnections();
    ack = mock.fn(async () => {});
    client = mockClient();
  });

  afterEach(() => {
    tempConnections.close();
  });

  /**
   * @param {string} method
   */
  function lastCall(method) {
    return client.calls.findLast(
      (/** @type {[string, any]} */ [name]) => name === method,
    )[1];
  }

  function sentProvider() {
    return lastCall("apps.user.connection.requestAuth").primary_provider;
  }

  function homeBlock() {
    return lastCall("views.publish").view.blocks.at(-1);
  }

  it("app home opened shows the connection", async () => {
    connections.connect("U0ADA");

    await appHomeOpenedCallback({ client, event: { user: "U0ADA" } });

    assert.strictEqual(lastCall("views.publish").user_id, "U0ADA");
    assert.strictEqual(homeBlock().is_connected, true);
  });

  it("connect saves and shows the connection", async () => {
    await connectCallback({ ack, body: buttonClick("acme"), client });

    assert.strictEqual(ack.mock.callCount(), 1);
    assert.ok(connections.isConnected("U0ADA"));
    assert.strictEqual(sentProvider().is_connected, true);
    assert.strictEqual(homeBlock().is_connected, true);
  });

  it("disconnect forgets and shows the connection", async () => {
    connections.connect("U0ADA");

    await disconnectCallback({ ack, body: buttonClick("acme"), client });

    assert.strictEqual(ack.mock.callCount(), 1);
    assert.ok(!connections.isConnected("U0ADA"));
    assert.strictEqual(sentProvider().is_connected, false);
    assert.strictEqual(homeBlock().is_connected, false);
  });

  it("connect ignores another provider", async () => {
    await connectCallback({ ack, body: buttonClick("wile-e-coyote"), client });

    assert.strictEqual(ack.mock.callCount(), 1);
    assert.ok(!connections.isConnected("U0ADA"));
    assert.deepStrictEqual(client.calls, []);
  });

  it("disconnect ignores another provider", async () => {
    connections.connect("U0ADA");

    await disconnectCallback({
      ack,
      body: buttonClick("wile-e-coyote"),
      client,
    });

    assert.strictEqual(ack.mock.callCount(), 1);
    assert.ok(connections.isConnected("U0ADA"));
    assert.deepStrictEqual(client.calls, []);
  });

  it("user connection connect opens the modal", async () => {
    const event = {
      subtype: "connect",
      user: "U0ADA",
      trigger_id: "123.456.abc",
    };

    await userConnectionCallback({ client, event });

    const args = lastCall("apps.user.connection.requestAuth");
    assert.strictEqual(args.trigger_id, "123.456.abc");
    assert.strictEqual(args.primary_provider.is_connected, false);
  });

  it("user connection disconnect is ignored", async () => {
    const event = {
      subtype: "disconnect",
      user: "U0ADA",
      trigger_id: "123.456.abc",
    };

    await userConnectionCallback({ client, event });

    assert.deepStrictEqual(client.calls, []);
  });

  it("status requested reports connected users", async () => {
    connections.connect("U0ADA");

    await userConnectionStatusRequestedCallback({
      client,
      event: { user: "U0ADA" },
    });

    assert.deepStrictEqual(client.calls, [
      [
        "apps.user.connection.update",
        { user_id: "U0ADA", status: "connected" },
      ],
    ]);
  });

  it("status requested reports unknown users as disconnected", async () => {
    await userConnectionStatusRequestedCallback({
      client,
      event: { user: "U0ADA" },
    });

    assert.deepStrictEqual(client.calls, [
      [
        "apps.user.connection.update",
        { user_id: "U0ADA", status: "disconnected" },
      ],
    ]);
  });
});
