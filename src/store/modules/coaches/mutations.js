export default {
	registerCoach(state, payload) {
		state.coaches.push(payload)
	},
	setCoachName(state, payload) {
		state.coach = payload
	},
	setCoaches(state, payload) {
		state.coaches = payload
	},
	setFetchTimestamp(state) {
		state.lastFetch = new Date().getTime()
	},
}
