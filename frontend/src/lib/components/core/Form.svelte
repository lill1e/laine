<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';

	const { onsubmit, children, ...rest } = $props();

	const submit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		onsubmit();
	};
</script>

<form {...rest} onsubmit={submit}>
	{@render children()}
</form>
