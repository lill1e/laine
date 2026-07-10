<script lang="ts">
	import type { Game } from '$lib/api/game';
	import Card from '$lib/components/core/Card.svelte';
	import { toEditableGame, type EditableGame as EditableGameType } from '$lib/util/edit';
	import Button from '../core/Button.svelte';
	import CardModal from '../core/CardModal.svelte';
	import DisplayFrame from '../frame/DisplayFrame.svelte';
	import GameEditor from './GameEditor.svelte';
	import ScoreTable from './ScoreTable.svelte';

	const dtf = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'full'
	});

	interface Props {
		game: Game;
	}

	const { game }: Props = $props();
	let showEdit = $state(false);
	let editingGame = $state<EditableGameType | null>(null);

	$effect(() => {
		if (showEdit) {
			editingGame = toEditableGame(game);
		}
	});
</script>

<Card>
	{#snippet header()}
		{dtf.format(new Date(game.date))}

		<div class="header-actions">
			<Button type="link" onclick={() => (showEdit = true)}>Edit</Button>
		</div>
	{/snippet}

	<ScoreTable entries={game.entries}>
		{#snippet player(player, alias, _row)}
			<div class="player">
				<span class="username">{player.username}</span>
				<span class="alias">{alias}</span>
			</div>
		{/snippet}

		{#snippet frame(_player, frame, _col)}
			<DisplayFrame {frame} />
		{/snippet}
	</ScoreTable>
</Card>

<CardModal bind:show={showEdit} showActions>
	{#snippet header()}
		Edit game...
	{/snippet}

	<!-- Whenever we show the edit screen, it is guaranteed that the editable game is correct -->
	{#if editingGame}
		<GameEditor game={editingGame} />
	{/if}

	{#snippet actions()}
		<Button onclick={() => (showEdit = false)}>Cancel</Button>
		<Button type="primary">Save</Button>
	{/snippet}
</CardModal>

<style>
	.player {
		display: flex;
		flex-flow: column;
	}

	.username {
		font-size: 13px;
	}

	.alias {
		font-weight: normal;
	}
</style>
