<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	} & (
		| {
				showActions?: undefined;
		  }
		| {
				showActions?: boolean;
				actions: Snippet;
		  }
	);

	let props: Props = $props();
</script>

<div class="card">
	<div class="body">{@render props.children()}</div>
	{#if props.showActions}
		<div class="actions">{@render props.actions()}</div>
	{/if}
</div>

<style>
	.card {
		display: flex;
		flex-flow: column;
		border-radius: 10px;
		background: #fff;
		width: 100vw;
		flex-shrink: 0;
		flex-grow: 1;

		@media screen and (min-width: 700px) {
			width: 100%;
			/* We actually allow some slight leeway */
			max-width: 720px;
		}
	}

	.body {
		padding: 10px;
	}

	.actions {
		display: flex;
		margin-top: 10px;
		justify-content: flex-end;
		padding: 10px;
		gap: 5px;
	}
</style>
