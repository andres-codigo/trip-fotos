const firebaseConfig = {
	apiUrl: process.env.VUE_APP_API_URL,
	apiKey: process.env.VUE_APP_API_KEY,
}

let timer

export default {
	async login(context, payload) {
		return context.dispatch('auth', {
			...payload,
			mode: 'login',
		})
	},
	async signup(context, payload) {
		return context.dispatch('auth', {
			...payload,
			mode: 'signup',
		})
	},
	async auth(context, payload) {
		const mode = payload.mode
		let url =
			firebaseConfig.apiUrl + 'signInWithPassword?key=' + firebaseConfig.apiKey

		if (mode === 'signup') {
			url = firebaseConfig.apiUrl + 'signUp?key=' + firebaseConfig.apiKey
		}
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: payload.email,
				password: payload.password,
				returnSecureToken: true,
			}),
		})

		const responseData = await response.json()

		if (!response.ok) {
			const error = new Error(
				responseData.message || 'Failed to authenticate. Check your login data.'
			)
			throw error
		}

		const expiresIn = +responseData.expiresIn * 1000
		// const expiresIn = 5000
		const expirationDate = new Date().getTime() + expiresIn

		let displayName = ''
		if (mode === 'signup') {
			displayName
		} else {
			displayName = responseData.displayName
		}

		localStorage.setItem('token', responseData.idToken)
		localStorage.setItem('userId', responseData.localId)
		localStorage.setItem('userName', displayName)
		localStorage.setItem('userEmail', responseData.email)
		localStorage.setItem('tokenExpiration', expirationDate)

		timer = setTimeout(function () {
			context.dispatch('autoLogout')
		}, expiresIn)

		context.commit('setUser', {
			token: responseData.idToken,
			userId: responseData.localId,
			userName: displayName,
			userEmail: responseData.email,
		})
	},
	tryLogin(context) {
		const token = localStorage.getItem('token')
		const userId = localStorage.getItem('userId')
		const userName = localStorage.getItem('userName')
		const userEmail = localStorage.getItem('userEmail')
		const tokenExpiration = localStorage.getItem('tokenExpiration')

		const expiresIn = +tokenExpiration - new Date().getTime()

		if (expiresIn < 0) {
			return
		}

		timer = setTimeout(function () {
			context.dispatch('autoLogout')
		}, expiresIn)

		if (token && userId) {
			context.commit('setUser', {
				token: token,
				userId: userId,
				userName: userName,
				userEmail: userEmail,
			})
		}
	},
	logout(context) {
		localStorage.removeItem('token')
		localStorage.removeItem('userId')
		localStorage.removeItem('userName')
		localStorage.removeItem('userEmail')
		localStorage.removeItem('tokenExpiration')

		clearTimeout(timer)

		context.commit('setUser', {
			token: null,
			userId: null,
			userName: null,
			userEmail: null,
		})
	},
	autoLogout(context) {
		context.dispatch('logout')
		context.commit('setAutoLogout')
	},
}
