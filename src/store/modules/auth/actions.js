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
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWj0EzBooyl5xKqQcizA7xyxvjMJgPMHY'

		if (mode === 'signup') {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWj0EzBooyl5xKqQcizA7xyxvjMJgPMHY'
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

		localStorage.setItem('token', responseData.idToken)
		localStorage.setItem('userName', responseData.displayName)
		localStorage.setItem('userId', responseData.localId)
		localStorage.setItem('tokenExpiration', expirationDate)

		timer = setTimeout(function () {
			context.dispatch('autoLogout')
		}, expiresIn)

		context.commit('setUser', {
			token: responseData.idToken,
			userName: responseData.displayName,
			userId: responseData.localId,
		})
	},
	tryLogin(context) {
		const token = localStorage.getItem('token')
		const userName = localStorage.getItem('userName')
		const userId = localStorage.getItem('userId')
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
				userName: userName,
				userId: userId,
			})
		}
	},
	logout(context) {
		localStorage.removeItem('token')
		localStorage.removeItem('userName')
		localStorage.removeItem('userId')
		localStorage.removeItem('tokenExpiration')

		clearTimeout(timer)

		context.commit('setUser', {
			token: null,
			userName: null,
			userId: null,
		})
	},
	autoLogout(context) {
		context.dispatch('logout')
		context.commit('setAutoLogout')
	},
}
