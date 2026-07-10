<script lang="ts">
	import type { Snippet } from 'svelte';

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
</script>

<dialog bind:this={dialog} onclose={() => (show = false)}>
	{@render children()}
</dialog>

<style>
	dialog {
		border: 0;
		background: none;
		outline: none;
		padding: 0;
	}
</style>
