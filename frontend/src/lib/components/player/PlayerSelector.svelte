<script>
	import { Player } from '$lib/api/player';
	import Select from '$lib/components/core/Select.svelte';
</script>

<Select>
	{#each Player.getAllPlayers() as player (player.id)}
		<option value={player.id}>{player.username}</option>
	{/each}
</Select>
