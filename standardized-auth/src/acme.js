export const ACME_VALUE = "acme";
export const CONNECT_ACTION_ID = `auth_provider_connect_${ACME_VALUE}`;
export const DISCONNECT_ACTION_ID = `auth_provider_disconnect_${ACME_VALUE}`;

export const WELCOME_GREETING =
  "*Welcome to Acme!* :rocket:\n" +
  "Connect your Acme account to start ordering. " +
  "Anvils ship same day, gravity permitting.";
export const CONNECTED_GREETING =
  "*You're all set!* :tada:\n" +
  "Your Acme account is connected. " +
  "Please keep giant magnets away from your laptop.";

/**
 * @typedef {object} Connection
 * @property {string} identity
 * @property {string} context
 */

/**
 * @param {string} text
 * @returns {import("@slack/types").PlainTextElement}
 */
function plainText(text) {
  return { type: "plain_text", text };
}

/**
 * @param {string} authUrl
 * @param {Connection | undefined} connection
 * @returns {import("@slack/web-api").UserConnectionPrimaryProvider}
 */
export function acmeProvider(authUrl, connection) {
  const provider = {
    value: ACME_VALUE,
    name: plainText("Acme account"),
    description: plainText(
      "Order rocket skates, anvils, and giant magnets without leaving Slack.",
    ),
    auth_url: authUrl,
    is_connected: connection !== undefined,
  };
  if (connection === undefined) {
    return provider;
  }
  return {
    ...provider,
    connected_identity: plainText(connection.identity),
    connected_context: plainText(connection.context),
  };
}

/**
 * @param {import("@slack/web-api").UserConnectionPrimaryProvider} provider
 * @returns {import("@slack/types").HomeView}
 */
export function homeView(provider) {
  const greeting = provider.is_connected
    ? CONNECTED_GREETING
    : WELCOME_GREETING;
  return {
    type: "home",
    blocks: [
      { type: "section", text: { type: "mrkdwn", text: greeting } },
      { type: "auth_provider", ...provider },
    ],
  };
}
