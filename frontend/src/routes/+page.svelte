<script lang="ts">
	import Card from '$lib/components/core/Card.svelte';
	import CardColumn from '$lib/components/core/CardColumn.svelte';
	import CardColumns from '$lib/components/core/CardColumns.svelte';
	import CardHeader from '$lib/components/core/CardHeader.svelte';
	import Checkbox from '$lib/components/core/Checkbox.svelte';
	import DateInput from '$lib/components/core/DateInput.svelte';
	import Field from '$lib/components/core/Field.svelte';
	import SessionCard from '$lib/components/session/SessionCard.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	let enableDateFilter = $state(false);
	let dateFilter: string = $state(new Date().toString());

	const filtered = $derived(
		enableDateFilter && dateFilter
			? data.sessions.filter((x) => x.date === dateFilter)
			: data.sessions
	);
</script>

<CardColumns>
	<CardColumn --style-max-width="300px">
		<Card>
			<CardHeader>Filters...</CardHeader>

			<Field>
				<Checkbox bind:checked={enableDateFilter} />
				<p>Date:</p>
			</Field>
			<DateInput disabled={!enableDateFilter} bind:value={dateFilter} />
		</Card>
	</CardColumn>

	<CardColumn>
		<!-- TODO: date is a very bad key -->
		{#each filtered as session (session.date)}
			<SessionCard {session} />
		{/each}
		{#if filtered.length === 0}
			<Card>
				<p>No games found matching filters</p>
			</Card>
		{/if}
	</CardColumn>
</CardColumns>
