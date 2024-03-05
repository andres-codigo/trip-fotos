export default {
	messages(state, _, _2, rootGetters) {
		const travellerId = rootGetters.userId
		return state.messages.filter((req) => req.travellerId === travellerId)
	},
	hasMessages(_, getters) {
		return getters.messages && getters.messages.length > 0
	},
	messagesCount(_, getters) {
		return getters.messages && getters.messages.length
	},
}
