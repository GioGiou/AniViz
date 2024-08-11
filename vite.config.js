import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import { enhancedImages } from '@sveltejs/enhanced-img';
import dsv from '@rollup/plugin-dsv' 
export default defineConfig({
	plugins: [enhancedImages(),		sveltekit(), dsv()],
	server: {
		fs: {
		  allow: [
			// search up for workspace root
			searchForWorkspaceRoot(process.cwd()),
			// your custom rules
			'./src/*',
			'./static/'
		  ],
		},
	  }
});
