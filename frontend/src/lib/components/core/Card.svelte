<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		header: Snippet;
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
	<div class="header">{@render props.header()}</div>
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
			max-width: 700px;
		}
	}

	.header {
		margin-right: 12px;
		margin-left: 16px;
		display: flex;
		height: 50px;
		align-items: center;
		justify-content: space-between;
		padding-top: 16px;
		padding-bottom: 15px;
		font-size: 16px;
		font-weight: 500;
		color: #151617;
		border-bottom: 1px dotted var(--color-neutral-200, #dcdddf);
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
