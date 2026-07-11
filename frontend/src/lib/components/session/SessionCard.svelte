<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Session } from '$lib/api/session';
	import Card from '$lib/components/core/Card.svelte';
	import { formatDateString } from '$lib/util/format';
	import CardHeader from '../core/CardHeader.svelte';
	import SessionBoxScore from './SessionBoxScore.svelte';

	interface Props {
		session: Session;
	}

	const { session }: Props = $props();
</script>

<Card>
	<CardHeader>
		<h3>{formatDateString(session.date)}</h3>
		<a class="gamecast" href={resolve(`/session/${session.date}`)}>Gamecast</a>
	</CardHeader>

	<SessionBoxScore {session} />
</Card>

<style>
	.gamecast {
		border-radius: 40px;
		border: 1px solid var(--link);
		color: var(--link);
		text-decoration: none;
		font-size: 12px;
		padding: 0 12px;
		height: 28px;
		display: flex;
		align-items: center;
		transition: all 0.25s ease-in-out;

		&:hover {
			background: #dee8fa;
		}
	}
</style>
