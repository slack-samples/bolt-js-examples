import * as assert from "node:assert";
import { afterEach, beforeEach, describe, it } from "node:test";
import { homeView, provider } from "../src/acme.js";
import * as connections from "../src/connections.js";
import { TempConnections } from "./helpers.js";

describe("acme", () => {
  /** @type {TempConnections} */
  let tempConnections;

  beforeEach(() => {
    tempConnections = new TempConnections();
  });

  afterEach(() => {
    tempConnections.close();
  });

  it("disconnected provider offers to connect", () => {
    assert.deepStrictEqual(provider("U0ADA"), {
      value: "acme",
      name: { type: "plain_text", text: "Acme account" },
      description: {
        type: "plain_text",
        text: "Order rocket skates, anvils, and giant magnets without leaving Slack.",
      },
      is_connected: false,
    });
  });

  it("connected provider names the slack user", () => {
    connections.connect("U0ADA");

    const acme = provider("U0ADA");

    assert.strictEqual(acme.is_connected, true);
    assert.deepStrictEqual(acme.connected_identity, {
      type: "plain_text",
      text: "U0ADA",
    });
  });

  it("home view renders the provider as an auth provider block", () => {
    const acme = provider("U0ADA");

    const view = homeView(acme);

    assert.strictEqual(view.type, "home");
    assert.deepStrictEqual(view.blocks.at(-1), {
      type: "auth_provider",
      ...acme,
    });
  });
});
