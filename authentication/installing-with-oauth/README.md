# OAuth with custom data

Pass per-install data (a tenant ID) through the Slack OAuth flow with a signed cookie and attach it to `installation.metadata`.

## Setup

1. Create a Slack app from `manifest.json` and update the redirect URL with your public HTTPS host.
2. Serve the app over HTTPS. The tenant cookie uses `Secure`, so browsers only send it over HTTPS. For local development, use ngrok.
3. Set the environment variables from `.env.example`.
4. Run `npm install` and `npm start`.
5. Open `https://<your-host>/slack/install?tenant=acme` and install the app.

## How it works

- `installPathOptions.beforeRedirection` reads the `tenant` query parameter and sets a signed, `HttpOnly`, `Secure`, `SameSite=Lax` cookie with a short expiry.
- `callbackOptions.beforeInstallation` validates the cookie and stores the tenant on `res.locals` for the rest of the request.
- `callbackOptions.afterInstallation` stores the tenant string in `installation.metadata` before the installation is stored.

## Security

- The cookie is signed, not encrypted. Do not put secrets in it.
- The signature proves the value came from this app; it does not prove the tenant exists or is authorized.
- Validate the tenant against your own records before trusting it.
- Keep the cookie short-lived and serve the app over HTTPS.
- The file installation store is for local development. Use a database-backed store in production.
