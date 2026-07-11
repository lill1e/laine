<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, MouseEventHandler } from 'svelte/elements';

	interface Props {
		class?: ClassValue;
		children: Snippet;
		type?: 'default' | 'primary' | 'icon' | 'link';
		outlined?: boolean;
		onclick?: MouseEventHandler<HTMLButtonElement>;
	}

	const {
		type = 'default',
		outlined,
		onclick,
		children,
		class: className,
		...rest
	}: Props = $props();
</script>

<button {onclick} class={[type, className, outlined && 'outlined']} {...rest}
	>{@render children()}</button
>

<style>
	button {
		--text: #222;
		--background: #eee;
		--background-hover: #ccc;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 0;
		outline: none;
		cursor: pointer;
		padding-left: 15px;
		padding-right: 15px;
		padding-top: 8px;
		padding-bottom: 8px;
		border-radius: 100px;
		font-size: 13px;

		color: var(--text);
		background: var(--background);
		&:hover {
			background: var(--background-hover);
		}

		&.primary {
			--text: #fff;
			--background: #3772df;
			--background-hover: #305bc8;
		}

		&.link {
			color: var(--link);
			background: none;
		}

		&.icon {
			background: none;
			padding: 0;
		}

		:global(> svg) {
			width: 1em;
			height: 1em;
			margin-right: 3px;
		}
	}
</style>
