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

/** @type {Array<[string, any]>} */
export const calls = [];

/**
 * @param {string} value
 */
function decodeField(value) {
  return value.startsWith("{") ? JSON.parse(value) : value;
}

/**
 * @param {string | URL} url
 * @param {RequestInit} init
 */
export async function fakeFetch(url, init) {
  const method = new URL(url).pathname.slice("/api/".length);
  if (method === "auth.test") {
    return Response.json({ ok: true, user_id: "U0BOT", bot_id: "B0BOT" });
  }
  const fields = new URLSearchParams(String(init.body));
  const args = Object.fromEntries(
    [...fields].map(([key, value]) => [key, decodeField(value)]),
  );
  calls.push([method, args]);
  return Response.json({ ok: true });
}
