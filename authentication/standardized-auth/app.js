import { App } from "@slack/bolt";
import { homeView, PROVIDER_VALUE, provider } from "./src/acme.js";
import * as connections from "./src/connections.js";

export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.event("app_home_opened", async ({ client, event }) => {
  await client.views.publish({
    user_id: event.user,
    view: homeView(provider(event.user)),
  });
});

app.action(
  { type: "block_actions", action_id: "auth_provider_connect" },
  async ({ ack, action, body, client }) => {
    await ack();
    if (action.type !== "button" || action.value !== PROVIDER_VALUE) {
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
  },
);

app.action(
  { type: "block_actions", action_id: "auth_provider_disconnect" },
  async ({ ack, action, body, client }) => {
    await ack();
    if (action.type !== "button" || action.value !== PROVIDER_VALUE) {
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
  },
);

app.event("user_connection", async ({ client, event }) => {
  if (event.subtype === "connect") {
    await client.apps.user.connection.requestAuth({
      trigger_id: event.trigger_id,
      primary_provider: provider(event.user),
    });
  }
});

app.event("user_connection_status_requested", async ({ client, event }) => {
  const status = connections.isConnected(event.user)
    ? "connected"
    : "disconnected";
  await client.apps.user.connection.update({ user_id: event.user, status });
});

if (import.meta.main) {
  await app.start();
}
