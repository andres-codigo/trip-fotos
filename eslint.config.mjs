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
	{
		plugins: {
			pluginCypress,
		},

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				defineProps: 'readonly',
				defineEmits: 'readonly',
			},
		},
		files: ['src/**/*.js'],
		ignores: ['cypress.config.js'],
		rules: {
			'no-console': 'off',
			'no-debugger': 'off',
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
	},
]
