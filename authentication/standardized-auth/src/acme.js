import * as connections from "./connections.js";

export const PROVIDER_VALUE = "acme";

/**
 * @typedef {import("@slack/web-api").UserConnectionPrimaryProvider} Provider
 */

/**
 * @param {string} userId
 * @returns {Provider}
 */
export function provider(userId) {
  /** @type {Provider} */
  const acme = {
    value: PROVIDER_VALUE,
    name: { type: "plain_text", text: "Acme account" },
    description: {
      type: "plain_text",
      text: "Order rocket skates, anvils, and giant magnets without leaving Slack.",
    },
    is_connected: connections.isConnected(userId),
  };
  if (acme.is_connected) {
    acme.connected_identity = { type: "plain_text", text: userId };
  }
  return acme;
}

/**
 * @param {Provider} acme
 * @returns {import("@slack/types").HomeView}
 */
export function homeView(acme) {
  return {
    type: "home",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "*Welcome to Acme!* :rocket:\n" +
            "Anvils ship same day, gravity permitting. " +
            "Please keep giant magnets away from your laptop.",
        },
      },
      { type: "auth_provider", ...acme },
    ],
  };
}
