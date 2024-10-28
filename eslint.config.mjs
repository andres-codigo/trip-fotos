import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import { includeIgnoreFile } from '@eslint/compat'
import pluginCypress from 'eslint-plugin-cypress/flat'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default [
	pluginCypress.configs.globals,
	includeIgnoreFile(gitignorePath),
	...compat.extends(
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'prettier'
	),
	...compat.env({
		es2020: true,
		node: true,
	}),
	{
		files: [
			'src/**/*.js',
			'src/**/**/*.js',
			'src/**/**/**/*.js',
			'src/**/*.vue',
			'src/**/**/*.vue',
		],
		ignores: ['*.config.js'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
				defineProps: 'readonly',
				defineEmits: 'readonly',
			},
		},
		rules: {
			'no-console': 'off',
			'no-debugger': 'off',
			'vue/multi-word-component-names': 'off',
		},
	},
	// Cypress ESLint Plugin
	{
		plugins: {
			pluginCypress,
		},
		files: ['cypress/**/**/**/*.spec.cy.js'],
		ignores: ['cypress.config.js'],
		languageOptions: {
			sourceType: 'commonjs',
			globals: {
				...globals.node,
				...globals.amd,
			},
		},
		rules: {
			// https://github.com/cypress-io/eslint-plugin-cypress
			'cypress/no-assigning-return-values': 'error',
			'cypress/no-unnecessary-waiting': 'error',
			'cypress/assertion-before-screenshot': 'warn',
			'cypress/no-force': 'warn',
			'cypress/no-async-tests': 'error',
			'cypress/no-async-before': 'error',
			'cypress/no-pause': 'error',
		},
	},
]
