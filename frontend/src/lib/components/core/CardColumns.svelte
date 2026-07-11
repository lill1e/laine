<script lang="ts">
	const { children } = $props();
</script>

<div class="container">
	{@render children()}
</div>

<style>
	.container {
		display: flex;
		flex-flow: row;
		padding: 10px;
		width: 100%;
		gap: 10px;
		justify-content: center;
		height: 0;
	}
</style>
