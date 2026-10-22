import { App } from "@slack/bolt";
import { homeView, PROVIDER_VALUE, provider } from "./src/acme.js";
import * as connections from "./src/connections.js";

/**
 * @typedef {import("@slack/bolt").AllMiddlewareArgs} AllMiddlewareArgs
 * @typedef {AllMiddlewareArgs & import("@slack/bolt").SlackEventMiddlewareArgs<"app_home_opened">} AppHomeOpenedArgs
 * @typedef {AllMiddlewareArgs & import("@slack/bolt").SlackActionMiddlewareArgs<import("@slack/bolt").BlockButtonAction>} ButtonArgs
 * @typedef {AllMiddlewareArgs & import("@slack/bolt").SlackEventMiddlewareArgs<"user_connection">} UserConnectionArgs
 * @typedef {AllMiddlewareArgs & import("@slack/bolt").SlackEventMiddlewareArgs<"user_connection_status_requested">} StatusRequestedArgs
 */

export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

/**
 * @param {AppHomeOpenedArgs} args
 */
export async function appHomeOpenedCallback({ client, event }) {
  await client.views.publish({
    user_id: event.user,
    view: homeView(provider(event.user)),
  });
}
app.event("app_home_opened", appHomeOpenedCallback);

/**
 * @param {ButtonArgs} args
 */
export async function connectCallback({ ack, body, client }) {
  await ack();
  if (body.actions[0].value !== PROVIDER_VALUE) {
    return;
  }
  const userId = body.user.id;
  connections.connect(userId);
  const acme = provider(userId);
  await client.apps.user.connection.requestAuth({
    user_id: userId,
    primary_provider: acme,
  });
  await client.views.publish({ user_id: userId, view: homeView(acme) });
}
app.action("auth_provider_connect", connectCallback);

/**
 * @param {ButtonArgs} args
 */
export async function disconnectCallback({ ack, body, client }) {
  await ack();
  if (body.actions[0].value !== PROVIDER_VALUE) {
    return;
  }
  const userId = body.user.id;
  connections.disconnect(userId);
  const acme = provider(userId);
  await client.apps.user.connection.requestAuth({
    user_id: userId,
    primary_provider: acme,
  });
  await client.views.publish({ user_id: userId, view: homeView(acme) });
}
app.action("auth_provider_disconnect", disconnectCallback);

/**
 * @param {UserConnectionArgs} args
 */
export async function userConnectionCallback({ client, event }) {
  if (event.subtype === "connect") {
    await client.apps.user.connection.requestAuth({
      trigger_id: event.trigger_id,
      primary_provider: provider(event.user),
    });
  }
}
app.event("user_connection", userConnectionCallback);

/**
 * @param {StatusRequestedArgs} args
 */
export async function userConnectionStatusRequestedCallback({ client, event }) {
  const status = connections.isConnected(event.user)
    ? "connected"
    : "disconnected";
  await client.apps.user.connection.update({ user_id: event.user, status });
}
app.event(
  "user_connection_status_requested",
  userConnectionStatusRequestedCallback,
);

if (import.meta.main) {
  await app.start();
}
