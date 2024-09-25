module.exports = {
	root: true,
	env: {
		node: true,
		es2022: true,
		'cypress/globals': true,
	},
	extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'prettier'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/multi-word-component-names': 'off',
		// Cypress ESLint Plugin
		// https://github.com/cypress-io/eslint-plugin-cypress
		'cypress/no-assigning-return-values': 'error',
		'cypress/no-unnecessary-waiting': 'error',
		'cypress/assertion-before-screenshot': 'warn',
		'cypress/no-force': 'warn',
		'cypress/no-async-tests': 'error',
		'cypress/no-async-before': 'error',
		'cypress/no-pause': 'error',
	},
	globals: {
		defineProps: 'readonly',
		defineEmits: 'readonly',
	},
	plugins: ['cypress'],
}
