import { app } from "./src/app.js";

const port = Number.parseInt(process.env.PORT || "3000", 10);

(async () => {
  try {
    await app.start(port);
    app.logger.info("⚡️ Bolt app is running!");
  } catch (error) {
    app.logger.error("Failed to start the app", error);
  }
})();
