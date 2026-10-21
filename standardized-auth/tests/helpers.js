import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export class TempConnections {
  constructor() {
    this.cwd = process.cwd();
    this.dir = mkdtempSync(join(tmpdir(), "acme-"));
    process.chdir(this.dir);
  }

  close() {
    process.chdir(this.cwd);
    rmSync(this.dir, { recursive: true });
  }
}

export function mockClient() {
  /** @type {Array<[string, any]>} */
  const calls = [];
  /**
   * @param {string} method
   */
  const record = (method) => async (/** @type {any} */ args) => {
    calls.push([method, args]);
    return { ok: true };
  };
  return {
    calls,
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
