<script lang="ts">
	import type { FrameLikeTotalled } from '$lib/api/frame';
	import FrameBase from './FrameBase.svelte';

	interface Props {
		frame: FrameLikeTotalled;
	}

	const props: Props = $props();
</script>

<FrameBase {...props}>
	{#snippet rollOne(value)}
		{#if props.frame.split}
			<div class="split">
				<span>{value}</span>
			</div>
		{:else}
			<span>{value}</span>
		{/if}
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

<style>
	.split {
		border: 1px solid currentColor;
		margin-left: -30%;
		aspect-ratio: 1;
		text-align: center;
		border-radius: 50%;
		height: 84%;
		line-height: 1.2;
	}
</style>
