<script lang="ts">
	import type { Snippet } from 'svelte';
	import Card from './Card.svelte';
	import Modal from './Modal.svelte';
	import { X } from '@lucide/svelte';

	type Props = {
		children: Snippet;
		header: Snippet;
		show: boolean;
	} & (
		| {
				showActions?: undefined;
		  }
		| {
				showActions: boolean;
				actions: Snippet;
		  }
	);

	let { show = $bindable(), ...props }: Props = $props();

	function hide() {
		show = false;
	}
</script>

<Modal bind:show>
	<Card showActions={props.showActions}>
		{#snippet header()}
			{@render props.header()}
			<button class="close-button" onclick={hide}><X /></button>
		{/snippet}
		{@render props.children()}
		{#snippet actions()}
			{#if props.showActions}
				{@render props.actions()}
			{/if}
		{/snippet}
	</Card>
</Modal>

<style>
	.close-button {
		background: transparent;
		border: 0;
		cursor: pointer;
		margin-left: 20px;
		outline: none;
	}
</style>
