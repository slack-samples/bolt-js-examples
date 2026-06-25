# Work Objects Example

A TypeScript app built with [Bolt for JavaScript](https://slack.dev/bolt-js/) that demonstrates **Work Objects** in Slack. This example shows how to:

- Unfurl links with rich Work Object metadata
- Display interactive details in the flexpane
- Support editing work object fields directly from Slack

This app responds to links being shared in Slack with Work Object metadata to display rich link previews. Users can click the preview to view detailed information in the flexpane, and edit supported fields like description and status.

Read the [Work Objects documentation](https://docs.slack.dev/messaging/work-objects/) to learn more!

## Setup

### 1. Create a Slack App

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps)
2. Click **"Create New App"**
3. Choose **"From an app manifest"**
4. Select your workspace
5. Copy the contents of `manifest.json` and paste it into the manifest editor
6. Review the configuration and click **"Create"**

### 2. Configure Environment Variables

1. Copy the environment variables template:
   ```bash
   cp .env.sample .env
   ```

2. Fill in your Slack credentials in `.env`:
   ```
   SLACK_BOT_TOKEN=xoxb-your-bot-token
   SLACK_APP_TOKEN=xapp-your-app-token
   ```

   You can find these values in your app's settings:
   - **Bot Token**: OAuth & Permissions → Bot User OAuth Token
   - **App Token**: Basic Information → App-Level Tokens (create one with `connections:write` scope)

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the App

```bash
npm start
```

## Troubleshooting

### Links aren't unfurling

1. Make sure you've added the domain used for the sample URLs in metadata.ts to the unfurl domains in App Settings
2. Verify that the `link_shared` event is enabled in Event Subscriptions
3. Check that your app has the `links:read` and `links:write` scopes
4. Ensure Socket Mode is enabled and you have a valid app-level token with `connections:write` scope
5. Verify the app is running (`⚡️ The Work Objects app is running!` should appear in console)

### Flexpane not opening

1. Ensure the `entity_details_requested` event is enabled in Event Subscriptions
2. Check that your app is connected via Socket Mode
3. Look for errors in the app logs

### Edits not saving

1. Ensure Interactivity is enabled in your app settings
2. Check that the `view_submission` handler is receiving events (check logs)
3. Verify the entity has editable fields defined with `edit: { enabled: true }`

## Key Features Demonstrated

- ✅ Link unfurling with `EntityMetadata`
- ✅ Flexpane display with `entity.presentDetails`
- ✅ Field editing via `view_submission`
- ✅ Support for both File and Task entity types
- ✅ TypeScript with strict typing using `@slack/types`
- ✅ Socket Mode for local development

## Resources

- [Work Objects Documentation](https://docs.slack.dev/messaging/work-objects/) - Official Slack docs
- [Entity Types Reference](https://docs.slack.dev/messaging/work-objects/#supported-entity-types) - Available entity types
- [Bolt for JavaScript](https://slack.dev/bolt-js/) - Framework documentation
- [@slack/types](https://www.npmjs.com/package/@slack/types) - TypeScript type definitions

## License

MIT
