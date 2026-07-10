<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import Card from '$lib/components/core/Card.svelte';
	import CardColumn from '$lib/components/core/CardColumn.svelte';
	import CreateModal from './CreateModal.svelte';
	import InviteModal from './InviteModal.svelte';

	let showInviteModal = $state(false);
	let showCreateModal = $state(false);
</script>

<CardColumn>
	<Card>
		{#snippet header()}
			Admin Controls
		{/snippet}

		<ul>
			<li>
				<Button onclick={() => (showCreateModal = true)}>Create a game</Button>
			</li>
			<li>
				<Button onclick={() => (showInviteModal = true)}>Invite a user</Button>
			</li>
		</ul>
	</Card>
</CardColumn>

<InviteModal bind:show={showInviteModal} />
<CreateModal bind:show={showCreateModal} />

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;

		li {
			margin-top: 5px;
		}
	}
</style>
