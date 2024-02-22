const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	devServer: {
		port: 5000,
	},
	lintOnSave: process.env.NODE_ENV !== 'production',
	css: {
		loaderOptions: {
			scss: {
				additionalData: `@import "@/styles/global.scss";`,
			},
		},
	},
})
