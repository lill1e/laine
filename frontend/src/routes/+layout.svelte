<script lang="ts">
	import Header from '$lib/components/core/Header.svelte';

	let { children } = $props();
</script>

<Header />
<main>
	{@render children()}
</main>

<style>
	:global {
		:root {
			--gray-1: #f1f2f3;
			--gray-2: #cbccce;
			--link: rgb(0, 102, 204);
		}

		* {
			box-sizing: border-box;
		}

		html,
		body {
			font-family: 'Libre Franklin', sans-serif;
			margin: 0;
			padding: 0;
			background: #edeef0;
			font-size: 12px;
		}

		a {
			color: var(--link);
		}

		input {
			outline: none;
		}
	}

	main {
		display: flex;
		flex-flow: column;
		justify-content: center;

		@media screen and (min-width: 700px) {
			flex-flow: row;
		}
	}
</style>
