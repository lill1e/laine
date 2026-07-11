<script lang="ts">
	const props = $props();
</script>

<div class="container">
	<table>
		{@render props.children()}
	</table>
</div>

<style>
	.container {
		width: 100%;
		overflow-x: auto;
	}

	table {
		--row-separator: var(--gray-1);
		border-collapse: collapse;
		font-size: 12px;

		:global {
			thead th {
				text-transform: uppercase;
				font-weight: 600;
				font-size: 11px;
				border-bottom: 1px solid #dcdddf;
				border-top: 1px solid #dcdddf;
				color: #48494a;
				height: 24px;
				padding: 4px 4px 3px;
			}

			tbody > tr > th {
				width: 100%;
			}

			tbody > tr > td,
			tbody > tr > th {
				border-bottom: 1px solid var(--row-separator);
				padding-left: 6px;
				padding-right: 6px;
				color: #6c6d6f;
				width: 100%;
			}

			tr {
				&:nth-child(even) {
					background: rgba(0, 0, 0, 0.02);
				}
			}
		}
	}
</style>
