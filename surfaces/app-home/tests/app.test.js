import assert from "node:assert";
import { describe, it, mock } from "node:test";
import { app } from "../src/app.js";

describe("app_home_opened", () => {
  it("views.publish", async () => {
    const event = {
      user: "U0123456789",
      tab: "home",
    };
    const calls = [];
    const fakeClient = {
      views: {
        publish: async (params) => {
          calls.push(params);
        },
      },
    };
    // @ts-expect-error
    await app.listeners.forEach(async (listener) => {
      await listener.forEach(async (handler) => {
        await handler({
          client: fakeClient,
          event: event,
          logger: console,
          next: () => {},
          say: () => {},
        });
      });
    });
    assert.strictEqual(calls.length, 2);
    assert.deepStrictEqual(calls[0], {
      user_id: "U0123456789",
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
    assert.deepStrictEqual(calls[1], {
      user_id: "U0123456789",
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
  });
});

describe("message.im", () => {
  it("chat.postMessage", async () => {
    const message = {
      type: "message",
      text: "greetings",
    };
    const say = mock.fn();
    // @ts-expect-error
    await app.listeners.forEach(async (listener) => {
      await listener.forEach(async (handler) => {
        await handler({
          event: message,
          logger: console,
          next: () => {},
          say: (message) => say(message),
        });
      });
    });
    assert.strictEqual(say.mock.callCount(), 1);
    assert.deepStrictEqual(say.mock.calls[0].arguments, [":wave:"]);
  });
});
