<script lang="ts">
	import { Player } from '$lib/api/player';
	import Select from '$lib/components/core/Select.svelte';

	interface Props {
		value: Player | undefined;
	}

	let { value = $bindable() }: Props = $props();
</script>

<Select bind:value={() => value?.id ?? '', (v) => (value = Player.getCached(v)!)}>
	<option disabled hidden selected value="">Player...</option>
	{#await Player.getAllPlayers() then players}
		{#each players as player (player.id)}
			<option value={player.id}>{player.username}</option>
		{/each}
	{/await}
</Select>
