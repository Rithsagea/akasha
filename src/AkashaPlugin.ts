import {
	AkashaPluginSettingsTab,
	DEFAULT_SETTINGS,
	type AkashaPluginSettings,
} from "AkashaPluginSettings";
import { setOpenAiApiKey } from "ChatModel";
import {
	LanguageModelView,
	VIEW_TYPE_LANGUAGE_MODEL,
	activateLanguageModelView,
} from "LanguageModelView";
import { Plugin } from "obsidian";

export default class AkashaPlugin extends Plugin {
	settings: AkashaPluginSettings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new AkashaPluginSettingsTab(this.app, this));

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

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);

		setOpenAiApiKey(this.settings.apiKey);
	}

	async saveSettings() {
		await this.saveData(this.settings);

		setOpenAiApiKey(this.settings.apiKey);
	}
}
