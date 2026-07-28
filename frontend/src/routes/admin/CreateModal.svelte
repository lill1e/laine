<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { createNewGame } from '$lib/api/game';
	import Button from '$lib/components/core/Button.svelte';
	import CardModal from '$lib/components/core/CardModal.svelte';
	import GameEditor from '$lib/components/game/GameEditor.svelte';
	import { newEditableGame } from '$lib/util/edit';

	interface Props {
		show: boolean;
	}

	let { show = $bindable() }: Props = $props();
	let game = $state(newEditableGame());
	let enabled = $derived(
		!!game.date &&
			!!game.entries.length &&
			game.entries.every(
				(e) => e.player && e.frames.length === 10 && e.frames.every((f) => f.rollOne !== null)
			)
	);

	async function create() {
		await createNewGame(game);
		goto(resolve(`/session/${game.date!}`));
	}
</script>

<CardModal bind:show showActions>
	{#snippet header()}
		Create a game...
	{/snippet}

	{#snippet actions()}
		<Button onclick={() => (show = false)}>Cancel</Button>
	<Button disabled={!enabled} onclick={create} type="primary">Create</Button>
	{/snippet}

	<GameEditor {game} />
</CardModal>
