import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({ apiKey: "", dangerouslyAllowBrowser: true });

export function setOpenAiApiKey(apiKey: string) {
	openai.apiKey = apiKey;
}

export async function getCompletion(...messages: ChatCompletionMessageParam[]) {
	const completion = await openai.chat.completions.create({
		messages,
		model: "gpt-3.5-turbo",
	});

	console.log(completion.choices);
	return completion.choices[0].message.content ?? "Error";
}
