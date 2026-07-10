<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, MouseEventHandler } from 'svelte/elements';

	interface Props {
		class?: ClassValue;
		children: Snippet;
		type?: 'default' | 'primary' | 'icon' | 'link';
		onclick?: MouseEventHandler<HTMLButtonElement>;
	}

	const { type = 'default', onclick, children, class: className, ...rest }: Props = $props();
</script>

<button {onclick} class={[type, className]} {...rest}>{@render children()}</button>

<style>
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #222;
		border: 0;
		outline: none;
		cursor: pointer;
		padding-left: 15px;
		padding-right: 15px;
		padding-top: 8px;
		padding-bottom: 8px;
		border-radius: 100px;
		font-size: 13px;

		&.primary {
			color: #fff;
			background: #3772df;
			&:hover {
				background: #305bc8;
			}
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
