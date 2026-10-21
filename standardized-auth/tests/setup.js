import nock from "nock";

process.env.SLACK_BOT_TOKEN = "xoxb-test-bot";
process.env.SLACK_APP_TOKEN = "xapp-test-app";

nock("https://slack.com")
  .persist()
  .post("/api/auth.test")
  .reply(200, { ok: true, user_id: "U0BOT", bot_id: "B0BOT" });
