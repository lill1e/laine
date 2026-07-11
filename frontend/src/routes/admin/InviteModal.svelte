<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import CardModal from '$lib/components/core/CardModal.svelte';
	import Field from '$lib/components/core/Field.svelte';
	import Form from '$lib/components/core/Form.svelte';
	import TextInput from '$lib/components/core/TextInput.svelte';

	interface Props {
		show: boolean;
	}

	let { show = $bindable() }: Props = $props();

	function onsubmit() {
		show = false;
	}
</script>

<CardModal bind:show>
	{#snippet header()}
		Invite a user...
	{/snippet}

	<Form {onsubmit}>
		<Field>
			<TextInput placeholder="Discord ID..." />
			<Button type="primary">Invite</Button>
		</Field>
	</Form>
</CardModal>
