<script lang="ts" generics="P, A, F extends FrameLikeTotalled">
	import type { FrameLikeTotalled } from '$lib/api/frame';
	import type { Snippet } from 'svelte';
	import Table from '$lib/components/core/Table.svelte';
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

<Table>
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
</Table>
