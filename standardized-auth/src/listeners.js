import { WebClient } from "@slack/web-api";
import { acmeProvider, homeView } from "./acme.js";

/**
 * @typedef {import("./acme.js").Connection} Connection
 * @typedef {import("./accounts.js").AcmeAccounts} AcmeAccounts
 * @typedef {import("@slack/oauth").Installation} Installation
 * @typedef {import("@slack/bolt").Context} Context
 * @typedef {import("@slack/bolt").AllMiddlewareArgs} MiddlewareArgs
 * @typedef {MiddlewareArgs & import("@slack/bolt").SlackActionMiddlewareArgs<import("@slack/bolt").BlockButtonAction>} ButtonArgs
 * @typedef {MiddlewareArgs & import("@slack/bolt").SlackEventMiddlewareArgs<"app_home_opened">} HomeOpenedArgs
 * @typedef {MiddlewareArgs & import("@slack/bolt").SlackEventMiddlewareArgs<"user_connection_status_requested">} StatusRequestedArgs
 * @typedef {MiddlewareArgs & import("@slack/bolt").SlackEventMiddlewareArgs<"tokens_revoked">} TokensRevokedArgs
 * @typedef {{ subtype: string, user: { id: string }, trigger_id?: string }} UserConnectionRequest
 * @typedef {MiddlewareArgs & { ack: () => Promise<void>, body: UserConnectionRequest }} UserConnectionArgs
 */

/**
 * @param {WebClient} client
 * @param {Installation | undefined} account
 * @returns {Promise<Connection | undefined>}
 */
export async function connectionOf(client, account) {
  if (account === undefined) {
    return undefined;
  }
  const identity = await client.auth.test({ token: account.user.token });
  return { identity: `@${identity.user}`, context: `${identity.team}` };
}

/**
 * @param {AcmeAccounts} accounts
 * @param {string} authUrl
 */
export function createListeners(accounts, authUrl) {
  /**
   * @param {WebClient} client
   * @param {string} userId
   * @param {Connection | undefined} connection
   */
  async function report(client, userId, connection) {
    const provider = acmeProvider(authUrl, connection);
    await client.apps.user.connection.requestAuth({
      user_id: userId,
      primary_provider: provider,
    });
    await client.views.publish({ user_id: userId, view: homeView(provider) });
  }

  /**
   * @param {WebClient} client
   * @param {Context} context
   * @param {string} userId
   */
  async function disconnect(client, context, userId) {
    const forgottenToken = await accounts.forget(context, userId);
    await report(client, userId, undefined);
    if (forgottenToken !== undefined) {
      await client.auth.revoke({ token: forgottenToken });
    }
  }

  /**
   * @param {WebClient} client
   * @param {Context} context
   * @param {string} userId
   * @param {string} triggerId
   */
  async function openConnectModal(client, context, userId, triggerId) {
    const account = await accounts.find(context, userId);
    await client.apps.user.connection.requestAuth({
      trigger_id: triggerId,
      primary_provider: acmeProvider(
        authUrl,
        await connectionOf(client, account),
      ),
    });
  }

  return {
    /**
     * @param {Installation} installation
     */
    async reportConnected(installation) {
      const client = new WebClient(installation.bot?.token);
      await report(
        client,
        installation.user.id,
        await connectionOf(client, installation),
      );
    },

    /**
     * @param {HomeOpenedArgs} args
     */
    async publishHome({ client, context, event }) {
      const account = await accounts.find(context, event.user);
      const provider = acmeProvider(
        authUrl,
        await connectionOf(client, account),
      );
      await client.views.publish({
        user_id: event.user,
        view: homeView(provider),
      });
    },

    /**
     * @param {ButtonArgs} args
     */
    async acknowledgeConnect({ ack }) {
      await ack();
    },

    /**
     * @param {ButtonArgs} args
     */
    async acknowledgeDisconnect({ ack, body, client, context }) {
      await ack();
      await disconnect(client, context, body.user.id);
    },

    /**
     * @param {StatusRequestedArgs} args
     */
    async answerStatusRequest({ client, context, event }) {
      const account = await accounts.find(context, event.user);
      await client.apps.user.connection.update({
        user_id: event.user,
        status: account === undefined ? "disconnected" : "connected",
      });
    },

    /**
     * @param {TokensRevokedArgs} args
     */
    async forgetRevokedUsers({ client, context, event }) {
      for (const userId of event.tokens.oauth ?? []) {
        await accounts.forget(context, userId);
        await report(client, userId, undefined);
      }
    },

    /**
     * @param {UserConnectionArgs} args
     */
    async handleUserConnection({ ack, body, client, context }) {
      await ack();
      if (body.subtype === "connect") {
        await openConnectModal(
          client,
          context,
          body.user.id,
          `${body.trigger_id}`,
        );
      } else if (body.subtype === "disconnect") {
        await disconnect(client, context, body.user.id);
      }
    },
  };
}
