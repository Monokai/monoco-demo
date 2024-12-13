<script>
	import '@styles/global.scss';
	import { colorLine, colorText } from '@scripts/core/Store'

	let {
		children
	} = $props();

	const year1 = '2024';
	const year2 = `${new Date().getFullYear()}`;

	let years = (year1 === year2) ? year1 : `${year1} – ${year2}`;

	$effect(() => {
		const style = window.getComputedStyle(document.documentElement);

		$colorLine = style.getPropertyValue('--color-line');
		$colorText = style.getPropertyValue('--color-text');
	})
</script>

<svelte:head>
	<title>Monoco — smooth squircle corners for HTML elements</title>
	<meta name="description" content="Monoco is a tiny JavaScript library that adds squircles (smooth corners) and other corner types to html elements.">
	<meta name="author" content="Monokai">
</svelte:head>

<div class="container">
	<main>
		{@render children()}
	</main>
	<footer>© {years} <a href="https://monokai.com">Monokai</a></footer>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		// justify-content: space-between;
		// height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		// align-items: center;
	}

	footer {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		font-size: 0.65rem;
		text-transform: uppercase;
		font-variation-settings: "wght" 500;
		letter-spacing: 0.1em;
		text-align: center;
	}
</style>