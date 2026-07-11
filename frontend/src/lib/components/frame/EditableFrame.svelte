<script lang="ts">
	import type { EditableFrame } from '$lib/util/edit';
	import { tick } from 'svelte';
	import FrameBase from './FrameBase.svelte';
	import type { FocusEventHandler } from 'svelte/elements';
	import { default as Self } from './EditableFrame.svelte';

	interface Props {
		frame: EditableFrame;
		isLastFrame?: boolean;
		next?: Self;
		prev?: Self;
	}

	const { frame = $bindable(), isLastFrame = false, next, prev }: Props = $props();

	let rollOneInput = $state<HTMLInputElement>();
	let rollTwoInput = $state<HTMLInputElement>();
	let extraRollInput = $state<HTMLInputElement>();

	type Token = '/' | number;

	type RollProp = 'rollOne' | 'rollTwo' | 'extraRoll';
	type FocusKind = RollProp | 'next' | 'prev';

	export function selectFirst() {
		focus('rollOne');
	}

	export function selectLast() {
		if (extraRollInput) focus('extraRoll');
		else if (rollTwoInput) focus('rollTwo');
		else focus('rollOne');
	}

	function parseToken(input: string): Token | null {
		const lower = input.toLowerCase();
		if (lower === 'x') return 10;
		if (lower === '-') return 0;
		if (lower === '/') return '/';
		const parsed = parseInt(lower);
		return Number.isNaN(parsed) ? null : parsed;
	}

	function before(prop: RollProp): FocusKind {
		switch (prop) {
			case 'rollOne':
				return 'prev';
			case 'rollTwo':
				return 'rollOne';
			case 'extraRoll':
				return 'rollTwo';
		}
	}

	function after(prop: RollProp): FocusKind {
		switch (prop) {
			case 'rollOne':
				return rollTwoInput ? 'rollTwo' : 'next';
			case 'rollTwo':
				return isLastFrame ? 'extraRoll' : 'next';
			case 'extraRoll':
				return 'next';
		}
	}

	function generateInputHandler(
		prop: RollProp,
		handler: (parsed: Token) => void
	): (event: KeyboardEvent) => void {
		return (event: KeyboardEvent) => {
			// Ignore any keypresses we dno't want to handle
			if (event.ctrlKey || event.metaKey) return null;
			if (event.key === 'Backspace') {
				event.preventDefault();

				// Move back if its already empty
				if (frame[prop] === null) {
					focus(before(prop));
				} else {
					frame[prop] = null;
				}

				return;
			}

			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				focus(before(prop));
				return;
			} else if (event.key === 'ArrowRight') {
				event.preventDefault();
				focus(after(prop));
				return;
			}

			// Ignore all other non-input chars
			if (event.key.length !== 1) return null;

			// Handle input ourselves
			event.preventDefault();
			event.stopPropagation();

			const parsed = parseToken(event.key);
			if (parsed !== null) {
				handler(parsed);
				focus(after(prop));
			}
		};
	}

	function focus(kind: FocusKind) {
		// need to await next UI tick so new inputs exist in DOM
		tick().then(() => {
			switch (kind) {
				case 'next':
					next?.selectFirst();
					break;
				case 'prev':
					prev?.selectLast();
					break;
				case 'rollOne':
					rollOneInput?.focus();
					break;
				case 'rollTwo':
					rollTwoInput?.select();
					break;
				case 'extraRoll':
					extraRollInput?.focus();
					break;
			}
		});
	}

	const rollOneHandler = generateInputHandler('rollOne', (parsed) => {
		// Roll one cannot be a spare
		if (parsed === '/') return;

		frame.rollOne = parsed;
		if (frame.rollTwo !== null) {
			frame.rollTwo = Math.min(frame.rollTwo, 10 - frame.rollOne);
		}
	});

	const rollTwoHandler = generateInputHandler('rollTwo', (parsed) => {
		if (parsed === '/') {
			frame.rollTwo = 10 - (frame.rollOne ?? 0);
			frame.rollOne = 10 - frame.rollTwo;
		} else {
			frame.rollTwo = parsed;
			if (frame.rollOne !== null && !isLastFrame) {
				frame.rollOne = Math.min(frame.rollOne, 10 - frame.rollTwo);
			}
		}
	});

	const extraRollHandler = generateInputHandler('extraRoll', (parsed) => {
		// Spare is not possible on extra roll
		if (parsed === '/') return;

		frame.extraRoll = parsed;
	});

	const focusInput: FocusEventHandler<HTMLInputElement> = (event) => {
		event.currentTarget?.select();
	};
</script>

<FrameBase {frame} doRenderBlanks doRenderAsLast={isLastFrame}>
	{#snippet rollOne(value)}
		<input
			bind:this={rollOneInput}
			type="text"
			{value}
			onkeydown={rollOneHandler}
			onfocus={focusInput}
		/>
	{/snippet}

	{#snippet rollTwo(value)}
		<input
			bind:this={rollTwoInput}
			type="text"
			{value}
			onkeydown={rollTwoHandler}
			onfocus={focusInput}
		/>
	{/snippet}

	{#snippet extraRoll(value)}
		<input
			bind:this={extraRollInput}
			type="text"
			{value}
			onkeydown={extraRollHandler}
			onfocus={focusInput}
		/>
	{/snippet}

	{#snippet total(value)}
		<div class="total-container">
			<div class="split-container">
				<p>split?</p>
				<input tabindex={-1} type="checkbox" />
			</div>
			<span>{value}</span>
		</div>
	{/snippet}
</FrameBase>

<style>
	input {
		width: 12px;
		border: 0;
		border-bottom: 1px solid var(--gray-2);
		text-align: inherit;
		background: transparent;
		margin-right: 1px;
		padding: 0;
	}

	.total-container {
		width: 100%;
		display: flex;
		align-items: flex-end;
	}

	.split-container {
		margin-top: 5px;
		display: flex;
		flex-flow: column;
		align-items: flex-start;
		flex: 1;
		width: 0;

		> p {
			margin: 0;
			font-size: 7px;
		}

		> input {
			margin: 0;
			width: 12px;
		}
	}
</style>
