<script lang="ts" generics="P, A, F extends FrameLikeTotalled">
	import type { FrameLikeTotalled } from '$lib/api/frame';
	import type { Snippet } from 'svelte';
	interface Props<P, A, F> {
		player: Snippet<[P, A, number]>;
		frame: Snippet<[P, F, number, number]>;
		entries: {
			player: P;
			alias: A;
			frames: F[];
		}[];
	}

	const { player, frame, entries }: Props<P, A, F> = $props();
</script>

<table>
	<thead>
		<tr>
			<th scope="col">Player</th>
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as num (num)}
				<th scope="col">{num}</th>
			{/each}
			<th scope="col">Final</th>
		</tr>
	</thead>
	<tbody>
		{#each entries as entry, row (entry)}
			<tr>
				<th scope="row">{@render player(entry.player, entry.alias, row)}</th>
				{#each entry.frames as entryFrame, col (entryFrame)}
					<td>{@render frame(entry.player, entryFrame, row, col)}</td>
				{/each}
				<th>{entry.frames[entry.frames.length - 1].total}</th>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		--row-separator: var(--gray-1);

		border-collapse: collapse;

		font-size: 12px;
	}

	thead th {
		text-transform: uppercase;
		font-weight: 600;
		font-size: 11px;
		border-bottom: 1px solid #dcdddf;
		border-top: 1px solid #dcdddf;
		color: #48494a;
		height: 24px;
		padding: 4px 4px 3px;
	}

	tbody > tr > th {
		width: 100%;
	}

	tbody > tr > td,
	tbody > tr > th {
		border-bottom: 1px solid var(--row-separator);
		padding-left: 6px;
		padding-right: 6px;
		color: #6c6d6f;
		width: 100%;
	}

	tr {
		&:nth-child(even) {
			background: rgba(0, 0, 0, 0.02);
		}
	}
</style>
