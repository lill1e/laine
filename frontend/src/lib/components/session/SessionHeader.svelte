<script lang="ts">
	import { Player } from '$lib/api/player';
	import type { Session } from '$lib/api/session';
	import { formatDateString } from '$lib/util/format';

	interface Props {
		session: Session;
	}

	const { session }: Props = $props();

	const totals = $derived(session.getTotals());
	const winnerId = $derived.by(() => {
		let winner;
		for (const id in totals) {
			if (!winner || totals[id] > totals[winner]) {
				winner = id;
			}
		}
		return winner;
	});
	const winner = $derived(Player.getCached(winnerId!)!);
</script>

<header>
	<div class="info">
		<h1 class="date">{formatDateString(session.date)}</h1>
	</div>
	<div class="winner">
		<div class="total">
			<svg class="total-arrow" height="10" width="5" xmlns="http://www.w3.org/2000/svg">
				<polygon fill="currentColor" points="0,10 0,0 5,5" />
			</svg>
			<span class="total-text">{totals[winner.id]}</span>
		</div>
		<div class="winner-info">
			<span class="winner-name">{winner.username}</span>
			<span class="winner-stats">0 games won</span>
		</div>
	</div>
</header>

<style>
	header {
		width: 100vw;
		background: #fff;
		display: flex;
		min-height: 104px;
		align-items: center;
		position: relative;

		&::after {
			content: ' ';
			height: 5px;
			width: 100%;
			position: absolute;
			bottom: 0;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0, transparent);
		}
	}

	.info {
		flex: 1;
		max-width: 50%;
	}

	.date {
		font-size: 21px;
		margin-left: 10px;
		text-align: center;
	}

	.winner {
		display: flex;
		flex-flow: row;
		align-items: center;
		margin: 10px;
		padding-left: 10px;
		height: 40px;
	}

	.total {
		display: flex;
		align-items: center;
	}

	.total-arrow {
		margin-right: 5px;
	}

	.total-text {
		font-weight: 900;
		font-size: 18pt;
		margin: 0;
	}

	.winner-info {
		margin-left: 30px;
		> span {
			display: block;
		}
	}

	.winner-name {
		margin: 0;
		font-size: 14px;
		font-weight: 600;
	}
</style>
