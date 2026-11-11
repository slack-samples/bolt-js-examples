import { App, ExpressReceiver, FileInstallationStore } from "@slack/bolt";
import cookieParser from "cookie-parser";
import express from "express";

const TENANT_COOKIE = "tenant";
export const TENANT_MAX_AGE_MS = 10 * 60 * 1000;

/**
 * @param {import("express").Request} req
 * @returns {string | undefined}
 */
function readTenant(req) {
  const payload = req.signedCookies?.[TENANT_COOKIE];
  if (
    payload === null ||
    typeof payload !== "object" ||
    typeof payload.tenant !== "string" ||
    typeof payload.issuedAt !== "number" ||
    Date.now() - payload.issuedAt > TENANT_MAX_AGE_MS
  ) {
    return undefined;
  }
  return payload.tenant;
}

export function createApp() {
  if (!process.env.COOKIE_SECRET) {
    throw new Error("COOKIE_SECRET is required to sign the tenant cookie");
  }

  const router = express.Router();
  router.use(cookieParser(process.env.COOKIE_SECRET));

  const receiver = new ExpressReceiver({
    router,
    signingSecret: process.env.SLACK_SIGNING_SECRET ?? "",
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    stateSecret: process.env.SLACK_STATE_SECRET ?? "",
    scopes: ["chat:write"],
    installationStore: new FileInstallationStore(),
    installerOptions: {
      directInstall: true,
      installPath: "/slack/install",
      installPathOptions: {
        /**
         * @param {import("http").IncomingMessage} request
         * @param {import("http").ServerResponse} response
         */
        beforeRedirection: async (request, response) => {
          const req = /** @type {import("express").Request} */ (request);
          const res = /** @type {import("express").Response} */ (response);
          // Validate the tenant against your own records before trusting it.
          res.cookie(
            TENANT_COOKIE,
            { tenant: req.query.tenant, issuedAt: Date.now() },
            {
              signed: true,
              httpOnly: true,
              secure: true,
              sameSite: "lax",
              maxAge: TENANT_MAX_AGE_MS,
            },
          );
          return true;
        },
      },
      callbackOptions: {
        /**
         * @param {any} _options
         * @param {import("http").IncomingMessage} request
         * @param {import("http").ServerResponse} response
         */
        beforeInstallation: async (_options, request, response) => {
          const req = /** @type {import("express").Request} */ (request);
          const res = /** @type {import("express").Response} */ (response);
          const tenant = readTenant(req);
          if (tenant === undefined) {
            res.status(400).send("Missing, invalid, or expired tenant cookie");
            return false;
          }
          // Keep the validated value for afterInstallation. Re-reading the
          // cookie after the token exchange would lose it if it expires.
          res.locals.tenant = tenant;
          return true;
        },
        /**
         * @param {any} installation
         * @param {any} _options
         * @param {import("http").IncomingMessage} _request
         * @param {import("http").ServerResponse} response
         */
        afterInstallation: async (
          installation,
          _options,
          _request,
          response,
        ) => {
          const res = /** @type {import("express").Response} */ (response);
          installation.metadata = res.locals.tenant;
          return true;
        },
      },
    },
  });

  const app = new App({ receiver });
  return { app, receiver };
}

export const { app, receiver } = createApp();
