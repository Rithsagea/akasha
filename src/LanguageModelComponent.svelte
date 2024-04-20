<script lang="ts">
	import { getCompletion } from "ChatModel";

	let prompt: string;
	let response: string = "";

	async function submitPrompt() {
		console.log(`Submitting Prompt: ${prompt}`);
		response = prompt;
		// response = await getCompletion(prompt);
	}
</script>

<h1>Language Model Tools</h1>

<h2>Prompt</h2>
<textarea bind:value={prompt} class="prompt-input" rows="10" />

<div>
	<button on:click={() => submitPrompt()}>Submit</button>
	<button>Cancel</button>
</div>

<h2>Output</h2>

<div class="prompt-output">
	<p>{response}</p>
</div>

<style>
	.prompt-input {
		resize: none;
		width: 100%;
	}

	.prompt-output {
		user-select: text;
	}
</style>
