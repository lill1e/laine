<script lang="ts">
	import FrameBase from './FrameBase.svelte';

	const props = $props();
</script>

<FrameBase {...props}>
	{#snippet rollOne(value)}
		<span>{value}</span>
	{/snippet}

	{#snippet rollTwo(value)}
		<span>{value}</span>
	{/snippet}

	{#snippet extraRoll(value)}
		<span>{value}</span>
	{/snippet}

	{#snippet total(value)}
		<span>{value}</span>
	{/snippet}
</FrameBase>
