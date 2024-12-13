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

	const title = "Monoco — smooth squircle corners for HTML elements";
	const description = "Monoco is a tiny JavaScript library that adds squircles (smooth corners) and other corner types to html elements.";
	const openGraphImageSquare = {
		img: {
			src: '/featured-image-square.jpg',
			w: '1200',
			h: '1200'
		}
	};

	const openGraphImage = {
		img: {
			src: '/featured-image.jpg',
			w: '1200',
			h: '630'
		}
	};

</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description}>
	<meta name="author" content="Monokai">
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={"https://monokai.github.io/monoco-demo"} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={openGraphImage.img.src} />
	<meta property="og:image:secure_url" content={openGraphImage.img.src} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content={openGraphImage.img.w} />
	<meta property="og:image:height" content={openGraphImage.img.h} />
	<meta property="og:image:alt" content={`${title} — ${description}`} />
	<meta property="og:image" content={openGraphImageSquare.img.src} />
	<meta property="og:image:secure_url" content={openGraphImageSquare.img.src} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content={openGraphImageSquare.img.w} />
	<meta property="og:image:height" content={openGraphImageSquare.img.h} />
	<meta property="og:image:alt" content={`${title} — ${description}`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@monokai" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={openGraphImageSquare.img.src} />
</svelte:head>

<div class="container">
	<main>
		{@render children()}
	</main>
	<footer>
		<p><span class="icon icon-copyright"></span>{years} <a href="https://monokai.com"><span class="icon icon-monokai"></span>Monokai</a></p>
	</footer>
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

	.icon {
		margin-right: 0.25rem;
		vertical-align: middle;
		line-height: 0;
	}

</style>