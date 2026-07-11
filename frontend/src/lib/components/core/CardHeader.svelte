<script lang="ts">
	const { children } = $props();
</script>

<header>
	{@render children()}
</header>

<style>
	header {
		margin-right: 12px;
		display: flex;
		height: 40px;
		align-items: center;
		justify-content: space-between;
		font-size: 16px;
		font-weight: 500;
		padding-left: 3px;
		color: #151617;
		border-bottom: 1px dotted #dcdddf;
	}
</style>
