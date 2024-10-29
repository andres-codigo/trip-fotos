import { defineConfig } from 'cypress'

export default defineConfig({
	env: {
		auth_url: '/auth',
		trips_url: '/trips',
		register_url: '/register',
		messages_url: '/messages',
	},
	e2e: {
		baseUrl: 'http://localhost:3000',
	},
})
