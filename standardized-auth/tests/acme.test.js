import * as assert from "node:assert";
import { describe, it } from "node:test";
import {
  acmeProvider,
  CONNECT_ACTION_ID,
  CONNECTED_GREETING,
  DISCONNECT_ACTION_ID,
  homeView,
  WELCOME_GREETING,
} from "../src/acme.js";

const AUTH_URL = "https://acme.example/slack/install";
const ADA = { identity: "@ada", context: "Acme Corp" };

describe("acme", () => {
  it("derives the action ids from the provider value", () => {
    assert.strictEqual(CONNECT_ACTION_ID, "auth_provider_connect_acme");
    assert.strictEqual(DISCONNECT_ACTION_ID, "auth_provider_disconnect_acme");
  });

  it("offers the Acme sign in to users who are not connected", () => {
    assert.deepStrictEqual(acmeProvider(AUTH_URL, undefined), {
      value: "acme",
      name: { type: "plain_text", text: "Acme account" },
      description: {
        type: "plain_text",
        text: "Order rocket skates, anvils, and giant magnets without leaving Slack.",
      },
      auth_url: AUTH_URL,
      is_connected: false,
    });
  });

  it("names the connected account", () => {
    const provider = acmeProvider(AUTH_URL, ADA);

    assert.strictEqual(provider.is_connected, true);
    assert.deepStrictEqual(provider.connected_identity, {
      type: "plain_text",
      text: "@ada",
    });
    assert.deepStrictEqual(provider.connected_context, {
      type: "plain_text",
      text: "Acme Corp",
    });
  });

  it("renders the provider as an auth_provider block in App Home", () => {
    const provider = acmeProvider(AUTH_URL, undefined);

    const view = homeView(provider);

    assert.strictEqual(view.type, "home");
    assert.deepStrictEqual(view.blocks.at(-1), {
      type: "auth_provider",
      ...provider,
    });
  });

  it("welcomes users who are not connected", () => {
    const view = homeView(acmeProvider(AUTH_URL, undefined));

    assert.strictEqual(view.blocks[0].text.text, WELCOME_GREETING);
  });

  it("celebrates users who are connected", () => {
    const view = homeView(acmeProvider(AUTH_URL, ADA));

    assert.strictEqual(view.blocks[0].text.text, CONNECTED_GREETING);
  });
});
