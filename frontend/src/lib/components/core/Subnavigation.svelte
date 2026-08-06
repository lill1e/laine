<script lang="ts">
	const { children } = $props();
</script>

<nav>
	{@render children()}
</nav>

<style>
	nav {
		width: 100%;
		height: 45px;
		background: #fff;

		> :global(a) {
			border-top: 3px solid transparent;
			border-bottom: 3px solid #d00;
			font-size: 14px;
			width: max-content;
			height: 100%;
			display: flex;
			align-items: center;
			padding: 10px;
			color: #000;
			text-decoration: none;
		}
	}
</style>
