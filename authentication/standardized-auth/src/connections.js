import { existsSync, readFileSync, writeFileSync } from "node:fs";

const FILENAME = "acme.json";

/**
 * @returns {Set<string>}
 */
function read() {
  if (!existsSync(FILENAME)) {
    return new Set();
  }
  return new Set(JSON.parse(readFileSync(FILENAME, "utf8")));
}

/**
 * @param {Set<string>} userIds
 */
function write(userIds) {
  writeFileSync(FILENAME, JSON.stringify([...userIds]));
}

/**
 * @param {string} userId
 */
export function connect(userId) {
  write(read().add(userId));
}

/**
 * @param {string} userId
 */
export function disconnect(userId) {
  const userIds = read();
  userIds.delete(userId);
  write(userIds);
}

/**
 * @param {string} userId
 * @returns {boolean}
 */
export function isConnected(userId) {
  return read().has(userId);
}
