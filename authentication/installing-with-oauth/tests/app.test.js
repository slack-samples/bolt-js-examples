process.env.SLACK_CLIENT_ID = "test-client-id";
process.env.SLACK_CLIENT_SECRET = "test-client-secret";
process.env.SLACK_SIGNING_SECRET = "test-signing-secret";
process.env.SLACK_STATE_SECRET = "test-state-secret";
process.env.COOKIE_SECRET = "test-cookie-secret";

import assert from "node:assert/strict";
import test from "node:test";
import cookieParser from "cookie-parser";
import express from "express";
import nock from "nock";
import request from "supertest";

const { createApp, receiver, TENANT_MAX_AGE_MS } = await import(
  "../src/app.js"
);

let storedInstallation;

nock("https://slack.com")
  .post("/api/auth.test")
  .reply(200, { ok: true, bot_id: "B0101", user_id: "U012345678" })
  .persist();

receiver.installer.installationStore.storeInstallation = async (
  installation,
) => {
  storedInstallation = installation;
};

receiver.installer.noTokenClient.oauth.v2.access = async () => ({
  ok: true,
  app_id: "A012345678",
  authed_user: {
    id: "U012345678",
    access_token: "xoxp-test-token",
    scope: "chat:write",
  },
  team: { id: "T012345678", name: "example-team" },
  token_type: "bot",
  access_token: "xoxb-test-token",
  bot_user_id: "U012345678",
  scope: "chat:write",
});

function findSetCookieHeader(response, name) {
  const setCookie = response.headers["set-cookie"];
  const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
  const cookie = cookies.find((value) => value?.startsWith(`${name}=`));
  assert.ok(cookie, `missing ${name} cookie`);
  return cookie;
}

function findSetCookie(response, name) {
  return findSetCookieHeader(response, name).split(";", 1)[0];
}

async function signedTenantCookie(payload) {
  const signer = express();
  signer.use(cookieParser(process.env.COOKIE_SECRET));
  signer.get("/", (_req, res) => {
    res.cookie("tenant", payload, { signed: true, httpOnly: true });
    res.sendStatus(204);
  });
  const response = await request(signer).get("/");
  return findSetCookie(response, "tenant");
}

async function startInstall(tenant) {
  const response = await request(receiver.app)
    .get("/slack/install")
    .query({ tenant });
  assert.equal(response.status, 302);
  const location = new URL(response.headers.location);
  const state = location.searchParams.get("state");
  assert.ok(state);
  return {
    state,
    tenantHeader: findSetCookieHeader(response, "tenant"),
    tenantCookie: findSetCookie(response, "tenant"),
    stateCookie: findSetCookie(response, "slack-app-oauth-state"),
  };
}

function callbackRequest({ tenantCookie, stateCookie, state }) {
  return request(receiver.app)
    .get("/slack/oauth_redirect")
    .query({ code: "test-code", state })
    .set("Cookie", [tenantCookie, stateCookie]);
}

test("install path sets a signed tenant cookie", async () => {
  const { tenantCookie, tenantHeader } = await startInstall("tenant-a");
  const signed = decodeURIComponent(tenantCookie.slice("tenant=".length));
  const unsigned = signed.slice(2, signed.lastIndexOf("."));
  const payload = JSON.parse(unsigned.slice(2));

  assert.equal(payload.tenant, "tenant-a");
  assert.equal(typeof payload.issuedAt, "number");
  assert.match(tenantHeader, /HttpOnly/i);
  assert.match(tenantHeader, /Secure/i);
  assert.match(tenantHeader, /SameSite=Lax/i);
  assert.match(tenantHeader, /Max-Age=600/i);
});

test("createApp requires COOKIE_SECRET", () => {
  const original = process.env.COOKIE_SECRET;
  delete process.env.COOKIE_SECRET;

  try {
    assert.throws(() => createApp(), /COOKIE_SECRET is required/);
  } finally {
    process.env.COOKIE_SECRET = original;
  }
});

test("callback rejects a missing tenant cookie", async () => {
  const { stateCookie, state } = await startInstall("tenant-a");
  const response = await callbackRequest({
    tenantCookie: "",
    stateCookie,
    state,
  });

  assert.equal(response.status, 400);
  assert.match(response.text, /Missing, invalid, or expired tenant cookie/);
});

test("callback rejects a tampered tenant cookie", async () => {
  const { tenantCookie, stateCookie, state } = await startInstall("tenant-a");
  const tampered = `${tenantCookie.slice(0, -1)}x`;
  const response = await callbackRequest({
    tenantCookie: tampered,
    stateCookie,
    state,
  });

  assert.equal(response.status, 400);
});

test("callback rejects an expired tenant cookie", async () => {
  const tenantCookie = await signedTenantCookie({
    tenant: "tenant-a",
    issuedAt: Date.now() - TENANT_MAX_AGE_MS - 1000,
  });
  const { stateCookie, state } = await startInstall("tenant-a");
  const response = await callbackRequest({ tenantCookie, stateCookie, state });

  assert.equal(response.status, 400);
});

test("valid cookie reaches afterInstallation and is stored in metadata", async () => {
  storedInstallation = undefined;
  const { tenantCookie, stateCookie, state } = await startInstall("tenant-a");
  const response = await callbackRequest({ tenantCookie, stateCookie, state });

  assert.equal(response.status, 200);
  assert.equal(storedInstallation.metadata, "tenant-a");
});

test("validates the tenant before the token exchange and survives cookie expiry", async () => {
  storedInstallation = undefined;
  const realNow = Date.now;
  let now = realNow();
  Date.now = () => now;

  try {
    const tenantCookie = await signedTenantCookie({
      tenant: "tenant-a",
      issuedAt: now - TENANT_MAX_AGE_MS + 1000,
    });
    const { stateCookie, state } = await startInstall("tenant-a");
    const teamTokenResponse = receiver.installer.noTokenClient.oauth.v2.access;

    receiver.installer.noTokenClient.oauth.v2.access = async () => {
      now += 2000;
      return teamTokenResponse();
    };

    try {
      const response = await callbackRequest({
        tenantCookie,
        stateCookie,
        state,
      });

      assert.equal(response.status, 200, response.text);
      assert.equal(storedInstallation.metadata, "tenant-a");
    } finally {
      receiver.installer.noTokenClient.oauth.v2.access = teamTokenResponse;
    }
  } finally {
    Date.now = realNow;
  }
});

test("callback rejects an invalid state", async () => {
  const { tenantCookie, stateCookie } = await startInstall("tenant-a");
  const response = await callbackRequest({
    tenantCookie,
    stateCookie,
    state: "invalid-state",
  });

  assert.equal(response.status, 400);
});
