<script lang="ts">
	const { children } = $props();
</script>

<div class="container">{@render children()}</div>

<style>
	.container {
		display: flex;
		flex-flow: column;
		gap: 10px;
		width: 100%;
		max-width: 700px;
		max-width: var(--style-max-width);
	}
</style>
