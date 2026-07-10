<script lang="ts">
	import Card from '$lib/components/core/Card.svelte';
	import CardColumn from '$lib/components/core/CardColumn.svelte';
	import Checkbox from '$lib/components/core/Checkbox.svelte';
	import DateInput from '$lib/components/core/DateInput.svelte';
	import Field from '$lib/components/core/Field.svelte';
	import GameCard from '$lib/components/game/GameCard.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<CardColumn --style-max-width="300px">
	<Card>
		{#snippet header()}
			Filters...
		{/snippet}

		<Field>
			<Checkbox />
			<p>Date:</p>
		</Field>
		<DateInput disabled />
	</Card>
</CardColumn>

<CardColumn>
	<!-- TODO: date is a very bad key -->
	{#each data.games as game (game.date)}
		<GameCard {game} />
	{/each}
</CardColumn>
