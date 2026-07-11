<script lang="ts">
	import { Player } from '$lib/api/player';
	import type { Session } from '$lib/api/session';
	import Table from '$lib/components/core/Table.svelte';

	interface Props {
		session: Session;
	}

	const { session }: Props = $props();
	const totals = $derived(session.getTotals());
	// We are assuming they must be cached
	const players = $derived(Object.keys(totals).map((id) => Player.getCached(id)!));
</script>

<Table>
	<thead>
		<tr>
			<th scope="col">Player</th>
			<th scope="col">Total</th>
		</tr>
	</thead>
	<tbody>
		{#each players as player (player.id)}
			<tr>
				<th scope="row">{player.username}</th>
				<td>{totals[player.id]}</td>
			</tr>
		{/each}
	</tbody>
</Table>
