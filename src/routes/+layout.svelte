<script>
	import '@styles/global.scss';
	import { colorLine, colorText } from '@scripts/core/Store'

	let {
		children
	} = $props();

	$effect(() => {
		const style = window.getComputedStyle(document.documentElement);

		$colorLine = style.getPropertyValue('--color-line');
		$colorText = style.getPropertyValue('--color-text');
	})
</script>

<div class="container">
	<main>
		{@render children()}
	</main>
	<footer>© <span class="copyright"></span> <a href="https://monokai.com">Monokai</a></footer>
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