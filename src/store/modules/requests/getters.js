export default {
	requests(state, _, _2, rootGetters) {
		const travellerId = rootGetters.userId
		return state.requests.filter((req) => req.travellerId === travellerId)
	},
	hasRequests(_, getters) {
		return getters.requests && getters.requests.length > 0
	},
	requestsCount(_, getters) {
		return getters.requests && getters.requests.length
	},
}
