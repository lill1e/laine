<script lang="ts">
	let { value = $bindable(), ...rest } = $props();
</script>

<input bind:value {...rest} type="date" placeholder="Date..." />

<style>
	input {
		padding: 7px;
		padding-left: 10px;
		border-radius: 40px;
		background: #fafafa;
		border: 1px solid var(--gray-2);
		min-width: 100px;
		display: inline-block;
		min-width: 130px;
		font-family: inherit;
	}
</style>
