import { ItemView, Workspace, WorkspaceLeaf } from "obsidian";

import LanguageModelComponent from "./LanguageModelComponent.svelte";

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
			props: {
				variable: 1,
			},
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
