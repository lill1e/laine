<script lang="ts">
	import type { Game } from '$lib/api/game';
	import { toEditableGame, type EditableGame as EditableGameType } from '$lib/util/edit';
	import Button from '../core/Button.svelte';
	import CardModal from '../core/CardModal.svelte';
	import DisplayFrame from '../frame/DisplayFrame.svelte';
	import GameEditor from './GameEditor.svelte';
	import ScoreTable from './ScoreTable.svelte';

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

<div class="header">
	<span>Game {game.nth}</span>

	<div class="header-actions">
		<Button type="link" onclick={() => (showEdit = true)}>Edit</Button>
	</div>
</div>

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

<CardModal bind:show={showEdit} showActions>
	{#snippet header()}
		Edit game...
	{/snippet}

	{#if editingGame}
		<GameEditor game={editingGame} />
	{/if}

	{#snippet actions()}
		<Button onclick={() => (showEdit = false)}>Cancel</Button>
		<Button type="primary">Save</Button>
	{/snippet}
</CardModal>

<style>
	.header {
		display: flex;
		width: 100%;
		flex-flow: row;
		align-items: center;

		> span {
			flex: 1;
		}
	}

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
