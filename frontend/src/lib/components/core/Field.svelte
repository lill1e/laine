<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<div class="field">
	{@render children()}
</div>

<style>
	.field {
		display: flex;
		align-items: center;
		gap: 3px;

		:global(> input) {
			display: inline-block;
		}
	}
</style>
