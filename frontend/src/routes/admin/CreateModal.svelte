<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import CardModal from '$lib/components/core/CardModal.svelte';
	import GameEditor from '$lib/components/game/GameEditor.svelte';
	import { newEditableGame } from '$lib/util/edit';

	interface Props {
		show: boolean;
	}

	let { show = $bindable() }: Props = $props();
	let game = $state(newEditableGame());
</script>

<CardModal bind:show showActions>
	{#snippet header()}
		Create a game...
	{/snippet}

	{#snippet actions()}
		<Button onclick={() => (show = false)}>Cancel</Button>
		<Button type="primary">Create</Button>
	{/snippet}

	<GameEditor {game} />
</CardModal>
