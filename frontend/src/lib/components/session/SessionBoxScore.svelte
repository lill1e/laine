<script lang="ts">
	import type { Session } from '$lib/api/session';
	import GameDetails from '../game/GameDetails.svelte';
	import SessionTotals from './SessionTotals.svelte';

	interface Props {
		session: Session;
	}

	const { session }: Props = $props();
</script>

<div class="totals">
	<h2 class="totals-title">Totals</h2>
	<SessionTotals {session} />
</div>

<!-- TODO: use proper game ID -->
{#each session.games as game (game)}
	<GameDetails {game} />
{/each}

<style>
	.totals {
		margin-bottom: 10px;
	}

	.totals-title {
		font-size: 13px;
		margin-bottom: 2px;
	}
</style>
