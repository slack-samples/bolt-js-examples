import { fakeFetch } from "./helpers.js";

process.env.SLACK_BOT_TOKEN = "xoxb-test-bot";
process.env.SLACK_APP_TOKEN = "xapp-test-app";

globalThis.fetch = fakeFetch;
