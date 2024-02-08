export default {
	setUser(state, payload) {
		state.token = payload.token
		state.userId = payload.userId
		state.userName = payload.userName
		state.userEmail = payload.userEmail
		state.didAutoLogout = false
	},
	setAutoLogout(state) {
		state.didAutoLogout = true
	},
}
