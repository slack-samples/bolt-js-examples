import type { EntityMetadata, EntityType } from "@slack/types";

// Update the URL here to match your app's domain
export const sample_task_unfurl_url = "https://myappdomain.com/task";
export const sample_file_unfurl_url = "https://myappdomain.com/file";

/*
 * Sample work objects
 */
export const workObjects: { [key: string]: EntityMetadata } = {
	[sample_file_unfurl_url]: {
		entity_type: "slack#/entities/file" as EntityType,
		entity_payload: {
			attributes: {
				title: {
					text: "Sample Document - Attachment",
				},
			},
			fields: {
				preview: {
					alt_text: "Sample Document",
					label: "Preview",
				},
				created_by: {
					type: "slack#/types/user",
					label: "Created by",
					user: {
						user_id: "U12345678",
					},
				},
				date_created: {
					value: 1705324800,
					label: "Created",
				},
				date_updated: {
					value: 1705756800,
					label: "Updated",
				},
				file_size: {
					value: "1.2 MB",
					label: "Size",
				},
				mime_type: {
					value: "application/pdf",
					label: "Type",
				},
			},
		},
		external_ref: {
			id: "file-001",
			type: "file",
		},
		url: sample_file_unfurl_url,
		app_unfurl_url: sample_file_unfurl_url,
	},
	[sample_task_unfurl_url]: {
		entity_type: "slack#/entities/task" as EntityType,
		entity_payload: {
			attributes: {
				title: {
					text: "Sample Task",
					edit: {
						enabled: true,
						placeholder: { type: "plain_text", text: "Enter task title" },
					},
				},
				display_type: "Super Task",
			},
			fields: {
				description: {
					value: "Hello World!",
					label: "Description",
					edit: {
						enabled: true,
						placeholder: { type: "plain_text", text: "Enter task description" },
					},
				},
				status: {
					value: "Open",
					label: "Status",
					edit: {
						enabled: true,
						placeholder: { type: "plain_text", text: "Select status" },
						select: {
							static_options: [
								{ text: { type: "plain_text", text: "Open" }, value: "open" },
								{
									text: { type: "plain_text", text: "In Progress" },
									value: "in_progress",
								},
								{
									text: { type: "plain_text", text: "Completed" },
									value: "completed",
								},
							],
						},
					},
				},
				priority: {
					value: "high",
					label: "Priority",
				},
				assignee: {
					type: "slack#/types/user",
					label: "Assignee",
					user: {
						user_id: "U12345678",
					},
				},
				date_created: {
					value: 1705324800,
					label: "Created",
				},
				date_updated: {
					value: 1705756800,
					label: "Updated",
				},
			},
		},
		external_ref: {
			id: "task-001",
			type: "task",
		},
		url: sample_task_unfurl_url,
		app_unfurl_url: sample_task_unfurl_url,
	},
};
