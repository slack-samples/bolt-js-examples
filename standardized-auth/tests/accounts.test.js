import * as assert from "node:assert";
import { describe, it } from "node:test";
import { AcmeAccounts } from "../src/accounts.js";
import { context, installation, temporaryStore } from "./helpers.js";

describe("accounts", () => {
  it("has no account for users who never installed", async () => {
    const accounts = new AcmeAccounts(temporaryStore());

    assert.strictEqual(await accounts.find(context(), "U0ADA"), undefined);
  });

  it("treats installations without a user token as no account", async () => {
    const store = temporaryStore();
    await store.storeInstallation(installation("U0ADA"));

    assert.strictEqual(
      await new AcmeAccounts(store).find(context(), "U0ADA"),
      undefined,
    );
  });

  it("finds the account of a user who connected", async () => {
    const store = temporaryStore();
    await store.storeInstallation(
      installation("U0ADA", { userToken: "xoxp-test-ada" }),
    );

    const account = await new AcmeAccounts(store).find(context(), "U0ADA");

    assert.strictEqual(account?.user.token, "xoxp-test-ada");
  });

  it("does not lend the latest installer's account to other users", async () => {
    const store = temporaryStore();
    await store.storeInstallation(
      installation("U0ADA", { userToken: "xoxp-test-ada" }),
    );

    assert.strictEqual(
      await new AcmeAccounts(store).find(context(), "U0BOB"),
      undefined,
    );
  });

  it("finds org-wide accounts from any workspace in the org", async () => {
    const store = temporaryStore();
    await store.storeInstallation(
      installation("U0ADA", {
        userToken: "xoxp-test-ada",
        enterpriseId: "E0001",
        isEnterpriseInstall: true,
      }),
    );
    const orgContext = context({
      teamId: "T0002",
      enterpriseId: "E0001",
      isEnterpriseInstall: true,
    });

    assert.ok(await new AcmeAccounts(store).find(orgContext, "U0ADA"));
  });

  it("forgets one user and keeps the others connected", async () => {
    const store = temporaryStore();
    await store.storeInstallation(
      installation("U0ADA", { userToken: "xoxp-test-ada" }),
    );
    await store.storeInstallation(
      installation("U0BOB", { userToken: "xoxp-test-bob" }),
    );
    const accounts = new AcmeAccounts(store);

    assert.strictEqual(
      await accounts.forget(context(), "U0ADA"),
      "xoxp-test-ada",
    );
    assert.strictEqual(await accounts.find(context(), "U0ADA"), undefined);
    assert.ok(await accounts.find(context(), "U0BOB"));
  });

  it("forgets the latest installer", async () => {
    const store = temporaryStore();
    await store.storeInstallation(
      installation("U0ADA", { userToken: "xoxp-test-ada" }),
    );
    const accounts = new AcmeAccounts(store);

    await accounts.forget(context(), "U0ADA");

    assert.strictEqual(await accounts.find(context(), "U0ADA"), undefined);
  });

  it("forgets org-wide accounts", async () => {
    const store = temporaryStore();
    await store.storeInstallation(
      installation("U0ADA", {
        userToken: "xoxp-test-ada",
        enterpriseId: "E0001",
        isEnterpriseInstall: true,
      }),
    );
    const orgContext = context({
      teamId: "T0002",
      enterpriseId: "E0001",
      isEnterpriseInstall: true,
    });
    const accounts = new AcmeAccounts(store);

    assert.strictEqual(
      await accounts.forget(orgContext, "U0ADA"),
      "xoxp-test-ada",
    );
    assert.strictEqual(await accounts.find(orgContext, "U0ADA"), undefined);
  });

  it("returns nothing when forgetting a user without an account", async () => {
    const accounts = new AcmeAccounts(temporaryStore());

    assert.strictEqual(await accounts.forget(context(), "U0ADA"), undefined);
  });
});
