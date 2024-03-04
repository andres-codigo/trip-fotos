export const APIConstants = Object.freeze({
	// API
	API_URL: import.meta.env.VITE_API_URL,
	API_KEY: import.meta.env.VITE_API_KEY,
	API_AUTH_LOGIN_MODE: 'login',
	API_AUTH_SIGNUP_MODE: 'signup',

	// DATABASE
	BASE_URL: import.meta.env.VITE_BACKEND_BASE_URL,
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
})
