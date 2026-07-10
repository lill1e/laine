<script lang="ts">
	interface Props {
		type?: 'default' | 'small';
		placeholder?: string;
		value?: string;
	}

	let { type = 'default', placeholder, value = $bindable() }: Props = $props();
</script>

<input size="1" type="text" class={type} {placeholder} bind:value />

<style>
	input {
		padding: 7px;
		padding-left: 10px;
		border-radius: 40px;
		background: #fafafa;
		border: 1px solid var(--gray-2);
		min-width: 100px;
		display: inline-block;

		&.small {
			height: 20px;
			padding: 3px;
			padding-left: 3px;
		}
	}
</style>
