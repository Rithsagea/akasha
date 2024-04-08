import { LanguageModelView, VIEW_TYPE_LANGUAGE_MODEL, activateLanguageModelView } from "LanguageModelView";
import { Plugin } from "obsidian";

export default class AkashaPlugin extends Plugin {
	async onload() {
		this.registerView(
			VIEW_TYPE_LANGUAGE_MODEL,
			(leaf) => new LanguageModelView(leaf)
		);

		this.addCommand({
			id: "open-language-model",
			name: "Open Language Model",
			callback: () => {
				activateLanguageModelView(this.app.workspace);
				console.log("Opening Language Model!");
			},
		});
	}

	onunload() {}
}
