import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			'@components': 'src/components',
			'@modules': 'src/components/modules',
			'@content': 'src/content',
			'@fonts': 'src/fonts',
			'@images': 'src/images',
			'@scripts': 'src/scripts',
			'@utils': 'src/scripts/utils',
			'@styles': 'src/styles'
		},
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			pages: 'public',
			assets: 'public',
			fallback: 'index.html',
			precompress: false,
			strict: false
		}),
		// prerender: {
		// 	entries: [
		// 		'*',
		// 		'/'
		// 	]
		// },
		paths: {
			// 404 pages need absolute reference to assets
			// assets: process.argv.includes('dev') ? '' : 'https://monokai.com'
		},
	}
};

export default config;
