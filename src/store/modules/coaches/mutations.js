export default {
	registerCoach(state, payload) {
		state.coaches.push(payload)
	},
	setCoach(state, payload) {
		state.coach = payload
	},
	deleteCoach(state, payload) {
		state.coach = payload
	},
	setCoachName(state, payload) {
		state.coachName = payload
	},
	setCoaches(state, payload) {
		state.coaches = payload
	},
	setFetchTimestamp(state) {
		state.lastFetch = new Date().getTime()
	},
}
