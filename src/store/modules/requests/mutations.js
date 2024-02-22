export default {
	addRequest(state, payload) {
		state.requests.push(payload)
	},
	deleteRequest: (state, payload) => {
		state.request = payload
	},
	setRequests(state, payload) {
		state.requests = payload
	},
	setRequestsCount(state, payload) {
		state.count = payload
	},
}
