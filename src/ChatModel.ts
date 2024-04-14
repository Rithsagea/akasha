import OpenAI from "openai";

const openai = new OpenAI({ apiKey: "", dangerouslyAllowBrowser: true });

export function setOpenAiApiKey(apiKey: string) {
	openai.apiKey = apiKey;
}
