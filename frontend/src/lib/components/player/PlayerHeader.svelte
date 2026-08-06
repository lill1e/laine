<script lang="ts">
	import type { Player } from '$lib/api/player';

	interface Props {
		player: Player;
	}

	const { player }: Props = $props();
</script>

<header>
	<div class="info">
		<img alt="avatar" class="avatar" src={player.avatarUrl} />
		<h1>{player.username}</h1>
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
		display: flex;
		flex-flow: row;
		align-items: center;
	}

	.avatar {
		width: 120px;
		height: 120px;
		border-radius: 100%;
		margin: 20px;
	}
</style>
