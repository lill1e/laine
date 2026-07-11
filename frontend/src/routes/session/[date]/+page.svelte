<script lang="ts">
	import Card from '$lib/components/core/Card.svelte';
	import CardColumn from '$lib/components/core/CardColumn.svelte';
	import CardColumns from '$lib/components/core/CardColumns.svelte';
	import SessionBoxScore from '$lib/components/session/SessionBoxScore.svelte';
	import SessionHeader from '$lib/components/session/SessionHeader.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { session } = $derived(data);
</script>

<main>
	<SessionHeader session={data.session} />
	<nav>
		<div class="box-score-button">Box Score</div>
	</nav>

	<CardColumns>
		<CardColumn>
			<Card>
				<SessionBoxScore {session} />
			</Card>
		</CardColumn>
	</CardColumns>
</main>

<style>
	nav {
		width: 100%;
		height: 45px;
		background: #fff;
	}

	.box-score-button {
		border-top: 3px solid transparent;
		border-bottom: 3px solid #d00;
		font-size: 14px;
		width: max-content;
		height: 100%;
		display: flex;
		align-items: center;
		padding: 10px;
	}
</style>
