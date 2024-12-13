<script>
	import App from '@components/App.svelte';
</script>

<div class="title">
	<h1>Monoco</h1>
	<h2>Smooth squircle corners for HTML elements</h2>
</div>
<div class="content">
	<p>Monoco is a tiny JavaScript library that adds squircles (smooth corners) and other corner types to html elements.</p>
</div>
<div class="app">
	<App />
</div>
<div class="content">
	<p>Monoco works by generating dynamic SVG code based on parameters of your choosing and setting that as a CSS background image or clip path. As such, it's compatible with all modern browsers.</p>
	<p>Monoco keeps track of element dimensions and makes sure it redraws the corners when they change.</p>
	<p>It's available in the following contexts:</p>
	<ul>
		<li><a href="https://github.com/monokai/monoco">Monoco for vanilla JavaScript</a></li>
		<li><a href="https://github.com/monokai/monoco-svelte">Monoco for Svelte components</a></li>
		<li><a href="https://github.com/monokai/monoco-react">Monoco for React components</a></li>
	</ul>
</div>

<style lang="scss">
	.title {
		margin: 2rem 0;

		h1, h2 {
			margin: 0 0 0.5rem 0;
		}

		margin-bottom: 4rem;
	}

	.content {
		margin: 0 auto 4rem auto;
		max-width: 48ch;

		font-size: 1.2rem;
	}

	.app {
		margin-bottom: 2rem;
	}

	ul {
		margin-top: 0;
	}
</style>