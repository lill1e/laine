<script lang="ts">
	import { resolve } from '$app/paths';
	import Card from '$lib/components/core/Card.svelte';
	import CardColumn from '$lib/components/core/CardColumn.svelte';
	import CardColumns from '$lib/components/core/CardColumns.svelte';
	import CardHeader from '$lib/components/core/CardHeader.svelte';
	import Subnavigation from '$lib/components/core/Subnavigation.svelte';
	import GameDetails from '$lib/components/game/GameDetails.svelte';
	import PlayerHeader from '$lib/components/player/PlayerHeader.svelte';
	import { formatDateString } from '$lib/util/format';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { player, games } = $derived(data);
</script>

<main>
	<PlayerHeader {player} />
	<Subnavigation>
		<a href={resolve(`/player/${player.id}`)}>Game Log</a>
	</Subnavigation>

	<CardColumns>
		<CardColumn>
			{#each games as game (game.id)}
				<Card>
					<CardHeader>
						<h3>{formatDateString(game.date)}</h3>
					</CardHeader>

					<GameDetails {game} />
				</Card>
			{/each}
		</CardColumn>
	</CardColumns>
</main>

<style>
</style>
