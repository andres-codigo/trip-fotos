export default {
	registerTraveller(state, payload) {
		state.travellers.push(payload)
	},
	setTraveller(state, payload) {
		state.traveller = payload
	},
	deleteTraveller(state, payload) {
		state.traveller = payload
	},
	setTravellerName(state, payload) {
		state.travellerName = payload
	},
	setTravellers(state, payload) {
		state.travellers = payload
	},
	setFetchTimestamp(state) {
		state.lastFetch = new Date().getTime()
	},
}
