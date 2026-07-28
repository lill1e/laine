<script>
	import { Player } from '$lib/api/player';
	import Select from '$lib/components/core/Select.svelte';

	let { value = $bindable() } = $props();
</script>

<Select bind:value placeholder="Select player">
	{#await Player.getAllPlayers() then players}
		{#each players as player (player.id)}
			<option value={player}>{player.username}</option>
		{/each}
	{/await}
</Select>
