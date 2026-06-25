import type { ViewSubmitAction } from "@slack/bolt";
import { App, LogLevel } from "@slack/bolt";
import type { EntityMetadata, TaskEntityFields } from "@slack/types";
import {
	sample_file_unfurl_url,
	sample_task_unfurl_url,
	workObjects,
} from "./metadata.js";

// Initialize Bolt app using Socket Mode
const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	appToken: process.env.SLACK_APP_TOKEN,
	socketMode: true,
	logLevel: LogLevel.DEBUG,
});

// Listens for the link_shared event
// https://docs.slack.dev/reference/events/link_shared/
app.event("link_shared", async ({ event, client, logger }) => {
	try {
		let entityUnfurls: { entities: EntityMetadata[] } = { entities: [] };

		for (const link of event.links) {
			// Fetch the entity from the URL
			const entity = workObjects[link.url];
			if (entity) {
				entityUnfurls = { entities: [entity] };
			}
		}

		// Send unfurls with entity metadata if any were created
		if (entityUnfurls.entities.length > 0) {
			await client.chat.unfurl({
				channel: event.channel,
				ts: event.message_ts,
				metadata: entityUnfurls,
			});
		}
	} catch (error) {
		logger.error("Error handling link_shared event:", error);
	}
});

// Listens for the entity_details_requested event, which is sent when a user opens the flexpane
// https://docs.slack.dev/reference/events/entity_details_requested/
app.event(
	"entity_details_requested",
	async ({ event, client, logger }: any) => {
		try {
			const entity = workObjects[event.entity_url];
			if (entity) {
				await client.apiCall("entity.presentDetails", {
					trigger_id: event.trigger_id,
					metadata: entity,
				});
			}
		} catch (error) {
			logger.error("Error handling entity_details_requested event:", error);
		}
	},
);

// Listens for the view_submission event, which is sent when the user submits edits in the flexpane
// https://docs.slack.dev/tools/bolt-js/concepts/view-submissions/
// https://docs.slack.dev/messaging/work-objects/#editing-view-submission
app.view("work-object-edit", async ({ ack, body, view, client, logger }) => {
	try {
		await ack();

		const entity = workObjects[view.entity_url ?? ""];

		// Extract updated values from the view_submission event and update the entity
		if (entity) {
			if (entity.url === sample_task_unfurl_url) {
				const fields = entity.entity_payload.fields as TaskEntityFields;

				const updatedDescription =
					view.state.values.description["description.input"].value;
				if (fields.description && updatedDescription) {
					fields.description.value = updatedDescription;
				}

				const updatedStatus =
					view.state.values.status["status.input"].selected_option?.text.text;
				if (fields.status && updatedStatus) {
					fields.status.value = updatedStatus;
				}
			}

			await client.apiCall("entity.presentDetails", {
				trigger_id: (body as ViewSubmitAction).trigger_id,
				metadata: entity,
			});
		}
	} catch (error) {
		logger.error("Error handling view_submission:", error);
	}
});

// Start the app
(async () => {
	try {
		await app.start();
		console.log("⚡️ The Work Objects app is running!");
		console.log("");
		console.log("Try sharing this link: ", sample_task_unfurl_url);
		console.log("Or this link: ", sample_file_unfurl_url);
	} catch (error) {
		console.error("Failed to start app:", error);
		process.exit(1);
	}
})();
