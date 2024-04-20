import { App, ItemView, Workspace, WorkspaceLeaf } from "obsidian";
import LanguageModelComponent from "./LanguageModelComponent.svelte";
import { getCompletion } from "ChatModel";

export const VIEW_TYPE_LANGUAGE_MODEL = "language-model-view";

export class LanguageModelView extends ItemView {
	component?: LanguageModelComponent;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_LANGUAGE_MODEL;
	}

	getDisplayText() {
		return "Language Model View";
	}

	async onOpen() {
		this.component = new LanguageModelComponent({
			target: this.contentEl,
		});
	}

	async onClose() {
		this.component?.$destroy();
	}
}

export async function activateLanguageModelView(workspace: Workspace) {
	let leaf = null;
	const leaves = workspace.getLeavesOfType(VIEW_TYPE_LANGUAGE_MODEL);

	if (leaves.length > 0) {
		leaf = leaves[0];
	} else {
		leaf = workspace.getRightLeaf(false);
		await leaf?.setViewState({
			type: VIEW_TYPE_LANGUAGE_MODEL,
			active: true,
		});
	}

	if (leaf) workspace.revealLeaf(leaf);
}

export async function summarizeCurrentNote(app: App) {
	const { workspace, vault } = app;

	const file = workspace.getActiveFile();
	if (file) {
		const content = await vault.read(file);
		const summary = await getCompletion(
			{
				role: "system",
				content: "You are a helpful assistant.",
			},
			{ role: "user", content: "Summarize the content of my notes." },
			{ role: "user", content: content }
		);

		console.log(summary);
	}
}
