<script lang="ts">
	let { value = $bindable(), placeholder, children } = $props();
</script>

<select bind:value {placeholder}>
	{@render children()}
</select>

<style>
	select {
		background: #fbfbfb;
		border: 1px solid var(--gray-2);
		border-radius: 40px;
		height: 20px;
		font-size: 12px;
		cursor: pointer;
		padding: 0 20px 0 5px;
		min-width: 100px;
	}
</style>
