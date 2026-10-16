import { App } from "@slack/bolt";
import { defaultCallbackSuccess } from "@slack/oauth";
import { AcmeAccounts } from "./accounts.js";
import { CONNECT_ACTION_ID, DISCONNECT_ACTION_ID } from "./acme.js";
import { createListeners } from "./listeners.js";

/**
 * @param {object} options
 * @param {Required<import("@slack/oauth").InstallationStore>} options.installationStore
 * @param {string} options.baseUrl
 * @returns {App}
 */
export function createApp({ installationStore, baseUrl }) {
  const listeners = createListeners(
    new AcmeAccounts(installationStore),
    `${baseUrl}/slack/install`,
  );
  const app = new App({
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    stateSecret: process.env.SLACK_STATE_SECRET,
    scopes: ["users:read"],
    installationStore,
    installerOptions: {
      directInstall: true,
      userScopes: ["users.profile:read"],
      callbackOptions: {
        successAsync: async (installation, options, req, res) => {
          await listeners.reportConnected(installation);
          defaultCallbackSuccess(installation, options, req, res);
        },
      },
    },
  });
  app.event("app_home_opened", listeners.publishHome);
  app.event("user_connection_status_requested", listeners.answerStatusRequest);
  app.event("tokens_revoked", listeners.forgetRevokedUsers);
  app.action(CONNECT_ACTION_ID, listeners.acknowledgeConnect);
  app.action(DISCONNECT_ACTION_ID, listeners.acknowledgeDisconnect);
  return app;
}
