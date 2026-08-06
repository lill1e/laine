<script lang="ts">
	import { resolve } from '$app/paths';
	import Card from '$lib/components/core/Card.svelte';
	import CardColumn from '$lib/components/core/CardColumn.svelte';
	import CardColumns from '$lib/components/core/CardColumns.svelte';
	import Subnavigation from '$lib/components/core/Subnavigation.svelte';
	import SessionBoxScore from '$lib/components/session/SessionBoxScore.svelte';
	import SessionHeader from '$lib/components/session/SessionHeader.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { session } = $derived(data);
</script>

<main>
	<SessionHeader session={data.session} />
	<Subnavigation>
		<a href={resolve(`/session/${session.date}`)}>Box Score</a>
	</Subnavigation>

	<CardColumns>
		<CardColumn>
			<Card>
				<SessionBoxScore {session} />
			</Card>
		</CardColumn>
	</CardColumns>
</main>
