import { FileInstallationStore } from "@slack/oauth";
import { createApp } from "./src/app.js";

const baseUrl = process.env.BASE_URL;
if (!baseUrl) {
  throw new Error("Set BASE_URL to the public URL of this app");
}

const app = createApp({
  installationStore: new FileInstallationStore({
    baseDir: "./data/installations",
  }),
  baseUrl,
});
const port = Number.parseInt(process.env.PORT || "3000", 10);

(async () => {
  try {
    await app.start(port);
    app.logger.info("⚡️ Bolt app is running!");
  } catch (error) {
    app.logger.error("Failed to start the app", error);
  }
})();
