export default {
	addMessage(state, payload) {
		state.messages.push(payload)
	},
	deleteMessage: (state, payload) => {
		state.message = payload
	},
	setMessages(state, payload) {
		state.messages = payload
	},
	setMessagesCount(state, payload) {
		state.count = payload
	},
}
