import { cpus } from 'os';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern'
			}
		}
	},
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			cache: false,
			maxParallelFileOps: Math.max(1, cpus().length - 1),
			output: {
				// experimentalMinChunkSize: 500000,
				manualChunks: (id) => {
					// if (id.includes('node_modules')) {
					// 	return 'vendor';
					// }

					// chunk everything into one big file:
					return 'app';
				}
			}
		}
	},
});
