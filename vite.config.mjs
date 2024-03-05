import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 5000,
		open: true,
	},
	plugins: [vue(), eslintPlugin()],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: fileURLToPath(new URL('./src', import.meta.url)),
			},
		],
		extensions: ['.js', '.json', '.mjs', '.vue', 'svg'],
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
              @import "./src/styles/global.scss";
            `,
			},
		},
	},
})
