import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		adapter: adapter(),
		target: '#svelte',
		ssr: false
	},
	preprocess: sveltePreprocess()
};