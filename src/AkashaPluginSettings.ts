import type AkashaPlugin from "AkashaPlugin";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface AkashaPluginSettings {
	apiKey: string;
}

export const DEFAULT_SETTINGS: Partial<AkashaPluginSettings> = {};

export class AkashaPluginSettingsTab extends PluginSettingTab {
	plugin: AkashaPlugin;

	constructor(app: App, plugin: AkashaPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const containerEl = this.containerEl;
		containerEl.empty();

		new Setting(containerEl).setName("OpenAI API key").addText((text) =>
			text
				.setPlaceholder("sk-********")
				.setValue(this.plugin.settings.apiKey)
				.onChange(async (value) => {
					this.plugin.settings.apiKey = value;
					await this.plugin.saveSettings();
				})
		);
	}
}
