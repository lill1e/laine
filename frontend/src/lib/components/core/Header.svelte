<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import logo from '$lib/assets/logo-full.webp';
</script>

<nav>
	<div class="logo-wrapper">
		<div class="logo-container">
			<a href={resolve('/')}><img class="logo" src={logo} alt="Laine Home" /></a>
		</div>
	</div>

	<div class="links">
		<a aria-current={page.url.pathname === '/'} href={resolve('/')}>Games</a>
		<a aria-current={page.url.pathname === '/admin'} href={resolve('/admin')}>Admin</a>
	</div>
</nav>

<style>
	nav {
		width: 100%;
		height: 45px;
		background: #2b2c2d;
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
	}

	.logo-wrapper {
		--logo-safe-background-width: 125px;
		width: calc(var(--logo-safe-background-width) + 20px);
		height: 100%;
	}

	.logo-container {
		display: inline-block;
		padding-left: 10px;
		display: inline-flex;
		align-items: center;
		height: 100%;

		> a {
			display: contents;
		}

		&::before,
		&::after {
			content: ' ';
			display: block;
			position: absolute;
			transform: skew(-25deg, 0);
			height: 100%;
			width: var(--logo-safe-background-width);
		}

		&::before {
			left: -3px;

			background: #b40000;
		}

		&::after {
			content: ' ';
			display: block;
			position: absolute;
			left: -13px;

			background: #d00;
		}
	}

	.logo {
		z-index: 1;
		height: 20px;
	}

	.links {
		display: inline-block;
		display: flex;
		align-items: center;

		> a {
			color: #fff;
			margin-right: 15px;
			font-size: 12px;
			font-weight: 500;
			text-decoration: none;

			&[aria-current='true'] {
				font-weight: 900;
			}
		}
	}
</style>
