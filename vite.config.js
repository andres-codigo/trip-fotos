import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 5000,
		open: true,
	},
	plugins: [vue()],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: fileURLToPath(new URL('./src', import.meta.url)),
			},
		],
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
