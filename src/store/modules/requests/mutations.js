export default {
	addRequest(state, payload) {
		state.requests.push(payload)
	},
	setRequests(state, payload) {
		state.requests = payload
	},
	setRequestsCount(state, payload) {
		state.count = payload
	},
}
