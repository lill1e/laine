<script lang="ts">
	import type { FrameLikeTotalled } from '$lib/api/frame';
	import { toHumanReadableFrameLike } from '$lib/util/frames';
	import type { Snippet } from 'svelte';

	interface Props {
		frame: FrameLikeTotalled;
		doRenderBlanks?: boolean;
		doRenderAsLast?: boolean;

		rollOne: Snippet<[string]>;
		rollTwo: Snippet<[string]>;
		extraRoll: Snippet<[string]>;
		total: Snippet<[string]>;
	}

	const { frame, total, doRenderBlanks, doRenderAsLast, rollOne, rollTwo, extraRoll }: Props =
		$props();

	const humanReadable = $derived(toHumanReadableFrameLike(frame));

	const renderAsHavingRollTwo = $derived(
		doRenderBlanks && (frame.rollOne !== 10 || doRenderAsLast)
	);

	const renderAsHavingExtraRoll = $derived(
		// Renders if it is the last frame, with blanks, and the first two are at least a   spare (one + two >= 10)
		doRenderBlanks && doRenderAsLast && (frame.rollOne ?? 0) + (frame.rollTwo ?? 0) >= 10
	);

	const showRollOne = $derived(!!(humanReadable.rollOne || doRenderBlanks));
	const showRollTwo = $derived(
		!!(humanReadable.rollTwo || (!!humanReadable.rollOne && renderAsHavingRollTwo))
	);
	const showExtraRoll = $derived(!!(humanReadable.extraRoll || renderAsHavingExtraRoll));
</script>

<div class={['frame', showRollTwo && 'has-roll-two', showExtraRoll && 'has-extra-roll']}>
	{#if showRollOne}
		<div class="roll-one">
			{@render rollOne(humanReadable.rollOne ?? '')}
		</div>
	{/if}
	{#if showRollTwo}
		<div class="roll-two">
			{@render rollTwo(humanReadable.rollTwo ?? '')}
		</div>
	{/if}
	{#if showExtraRoll}
		<div class="extra-roll">
			{@render extraRoll(humanReadable.extraRoll ?? '')}
		</div>
	{/if}
	<div class="total">
		{@render total(frame.total.toString())}
	</div>
</div>

<style>
	.frame {
		display: grid;
		grid-template-columns: 1fr;
		aspect-ratio: 1;
		min-width: 39px;

		&.has-roll-two {
			grid-template-columns: repeat(2, 1fr);
			> .roll-one {
				justify-content: flex-start;
				text-align: start;
			}
		}

		&.has-extra-roll {
			grid-template-columns: repeat(3, 1fr);

			> .roll-two {
				justify-content: center;
				text-align: center;
			}

			> .total {
				grid-column: 1 / 4;
			}
		}
	}

	.roll-one,
	.roll-two,
	.extra-roll {
		display: flex;
		justify-content: flex-end;
		text-align: end;
	}

	.total {
		grid-column: 1 / 3;
		display: flex;
		justify-content: flex-end;
		text-align: end;
	}
</style>
