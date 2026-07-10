<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import TextInput from '$lib/components/core/TextInput.svelte';
	import EditableFrame from '$lib/components/frame/EditableFrame.svelte';
	import type { EditableGame } from '$lib/util/edit';
	import { calculateTotals } from '$lib/util/frames';
	import { Trash2 } from '@lucide/svelte';
	import PlayerSelector from '../player/PlayerSelector.svelte';
	import ScoreTable from './ScoreTable.svelte';
	import DateInput from '../core/DateInput.svelte';

	interface Props {
		game: EditableGame;
	}

	const { game = $bindable() }: Props = $props();

	let frames = $state<EditableFrame[]>([]);

	function addPlayer() {
		game.entries.push({
			player: null,
			alias: null,

			frames: Array.from({ length: 10 })
				.fill(0)
				.map(() => ({
					rollOne: null,
					rollTwo: null,
					extraRoll: null,
					split: false,
					total: 0
				}))
		});
	}

	function removePlayer(row: number) {
		game.entries.splice(row, 1);
	}

	$effect.pre(() => {
		for (const entry of game.entries) {
			const totals = calculateTotals(entry.frames);
			for (let i = 0; i < entry.frames.length; i++) {
				entry.frames[i].total = totals[i];
			}
		}
	});
</script>

<h4>Date</h4>
<DateInput bind:value={game.date} />

<h4>Frames</h4>
<ScoreTable entries={game.entries}>
	{#snippet player(_player, _alias, row)}
		<div class="player">
			<div class="actions">
				<Button type="icon">
					<Trash2 onclick={() => removePlayer(row)} />
				</Button>
			</div>
			<div class="info">
				<PlayerSelector />
				<TextInput bind:value={game.entries[row].alias!} type="small" placeholder="Alias" />
			</div>
		</div>
	{/snippet}

	{#snippet frame(_player, _frame, row, col)}
		<!-- Cannot bind to snippet `frame`, but can bind to the variable... -->
		<EditableFrame
			bind:this={frames[row * 10 + col]}
			bind:frame={game.entries[row].frames[col]}
			isLastFrame={col === 9}
			prev={frames[row * 10 + col - 1]}
			next={frames[row * 10 + col + 1]}
		/>
	{/snippet}
</ScoreTable>
<Button class="add-player-button" onclick={addPlayer}>Add player</Button>

<style>
	:global(.add-player-button) {
		margin-top: 5px;
	}

	h4 {
		margin-bottom: 3px;
	}

	.player {
		display: flex;
		flex-flow: row;
		align-items: center;
		gap: 2px;

		> .info {
			display: flex;
			flex-flow: column;
			gap: 3px;
		}
	}
</style>
