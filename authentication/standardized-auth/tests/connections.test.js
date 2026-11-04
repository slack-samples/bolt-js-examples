import * as assert from "node:assert";
import { afterEach, beforeEach, describe, it } from "node:test";
import * as connections from "../src/connections.js";
import { TempConnections } from "./helpers.js";

describe("connections", () => {
  /** @type {TempConnections} */
  let tempConnections;

  beforeEach(() => {
    tempConnections = new TempConnections();
  });

  afterEach(() => {
    tempConnections.close();
  });

  it("remembers a connected user", () => {
    connections.connect("U0ADA");

    assert.ok(connections.isConnected("U0ADA"));
  });

  it("disconnect forgets the user", () => {
    connections.connect("U0ADA");

    connections.disconnect("U0ADA");

    assert.ok(!connections.isConnected("U0ADA"));
  });

  it("disconnect keeps other users connected", () => {
    connections.connect("U0ADA");
    connections.connect("U0BOB");

    connections.disconnect("U0ADA");

    assert.ok(connections.isConnected("U0BOB"));
  });

  it("disconnecting an unknown user changes nothing", () => {
    connections.disconnect("U0ADA");

    assert.ok(!connections.isConnected("U0ADA"));
  });
});
