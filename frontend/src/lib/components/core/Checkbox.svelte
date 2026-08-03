<script lang="ts">
	let { checked = $bindable(), ...rest } = $props();
</script>

<input type="checkbox" bind:checked {...rest} />

<style>
	input {
		background: #fff;
		border: 1px solid var(--gray-1);
		font-family: inherit;
		border-radius: 3px;
	}
</style>
