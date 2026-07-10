<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	interface Props {
		children: Snippet;
		show: boolean;
	}

	let { show = $bindable(), children }: Props = $props();

	let dialog = $state<HTMLDialogElement>();

	$effect(() => {
		if (show) dialog?.showModal();
		if (!show) dialog?.close();
	});

	// Handle outside clicks
	const onclick: MouseEventHandler<HTMLDialogElement> = (event) => {
		if (event.target === dialog) dialog?.close();
	};
</script>

<dialog bind:this={dialog} onclose={() => (show = false)} {onclick}>
	{@render children()}
</dialog>

<style>
	dialog {
		border: 0;
		background: none;
		outline: none;
		padding: 0;
		max-width: none;
		margin-left: 0;
		margin-right: 0;

		@media screen and (min-width: 700px) {
			margin-left: auto;
			margin-right: auto;
		}
	}
</style>
