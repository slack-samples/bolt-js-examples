import timers from "node:timers";
import bolt, { App, LogLevel } from "@slack/bolt";
import { TestReceiver } from "../tests/helpers.js";

export const app = new App({
  logLevel: process.env.NODE_ENV !== "test" ? LogLevel.DEBUG : LogLevel.WARN,
  receiver:
    process.env.NODE_ENV !== "test"
      ? new bolt.SocketModeReceiver({ appToken: process.env.SLACK_APP_TOKEN })
      : new TestReceiver(),
  token:
    process.env.NODE_ENV !== "test"
      ? process.env.SLACK_BOT_TOKEN
      : "xoxb-example",
  tokenVerificationEnabled: process.env.NODE_ENV !== "test",
});

app.event("app_home_opened", async ({ client, event, logger }) => {
  if (event.tab !== "home") {
    return;
  }
  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        type: "home",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "This is a Block Kit example",
            },
            accessory: {
              type: "image",
              image_url:
                "https://api.slack.com/img/blocks/bkb_template_images/notifications.png",
              alt_text: "calendar thumbnail",
            },
          },
        ],
      },
    });
    if (process.env.NODE_ENV !== "test") {
      await new Promise((r) => timers.setTimeout(r, 2000));
    }
    await client.views.publish({
      user_id: event.user,
      view: {
        type: "home",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "This is a Block Kit example",
            },
            accessory: {
              type: "image",
              image_url:
                "https://api.slack.com/img/blocks/bkb_template_images/notifications.png",
              alt_text: "calendar thumbnail",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Click Me",
                  emoji: true,
                },
                value: "click_me_123",
                action_id: "actionId-0",
              },
            ],
          },
        ],
      },
    });
  } catch (err) {
    logger.error(err);
  }
});

app.message(async ({ logger, say }) => {
  try {
    await say(":wave:");
  } catch (err) {
    logger.error(err);
  }
});

if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    try {
      await app.start();
      app.logger.info("⚡️ Bolt app is running!");
    } catch (err) {
      app.logger.error(err);
    }
  })();
}
