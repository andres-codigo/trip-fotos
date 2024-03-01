export default {
	traveller(state) {
		return state.traveller
	},
	travellerName(state) {
		return state.travellerName
	},
	travellers(state) {
		return state.travellers
	},
	hasTravellers(state) {
		return state.travellers && state.travellers.length > 0
	},
	isTraveller(_, getters, _2, rootGetters) {
		const travellers = getters.travellers
		const userId = rootGetters.userId
		return travellers.some((traveller) => traveller.id === userId)
	},
	shouldUpdate(state) {
		const lastFetch = state.lastFetch
		if (!lastFetch) {
			return true
		}
		const currentTimeStamp = new Date().getTime()
		return (currentTimeStamp - lastFetch) / 1000 > 60
	},
}
