import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { FileInstallationStore } from "@slack/oauth";

/**
 * @param {string} userId
 * @param {{ userToken?: string, teamId?: string, enterpriseId?: string, isEnterpriseInstall?: boolean }} [options]
 * @returns {import("@slack/oauth").Installation}
 */
export function installation(
  userId,
  {
    userToken,
    teamId = "T0001",
    enterpriseId,
    isEnterpriseInstall = false,
  } = {},
) {
  return {
    team: isEnterpriseInstall ? undefined : { id: teamId },
    enterprise: enterpriseId ? { id: enterpriseId } : undefined,
    user: { id: userId, token: userToken },
    bot: { id: "B0001", userId: "U0BOT", token: "xoxb-test-bot" },
    isEnterpriseInstall,
  };
}

/**
 * @param {{ teamId?: string, enterpriseId?: string, isEnterpriseInstall?: boolean }} [options]
 * @returns {import("@slack/bolt").Context}
 */
export function context({
  teamId = "T0001",
  enterpriseId,
  isEnterpriseInstall = false,
} = {}) {
  return { teamId, enterpriseId, isEnterpriseInstall };
}

export function temporaryStore() {
  const baseDir = mkdtempSync(join(tmpdir(), "acme-installations-"));
  return new FileInstallationStore({ baseDir });
}

export function stubClient() {
  /** @type {Array<[string, object]>} */
  const calls = [];
  /**
   * @param {string} method
   * @param {object} [result]
   */
  const record =
    (method, result = { ok: true }) =>
    async (/** @type {object} */ args) => {
      calls.push([method, args]);
      return result;
    };
  return {
    calls,
    auth: {
      test: record("auth.test", { ok: true, user: "ada", team: "Acme Corp" }),
      revoke: record("auth.revoke"),
    },
    apps: {
      user: {
        connection: {
          requestAuth: record("apps.user.connection.requestAuth"),
          update: record("apps.user.connection.update"),
        },
      },
    },
    views: { publish: record("views.publish") },
  };
}
