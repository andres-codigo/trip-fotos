import { APIConstants } from '../../../constants/api'
import { APIErrorMessageConstants } from '../../../constants/api-messages'

export default {
	async contactTraveller(context, payload) {
		const newMessage = {
			userName: payload.name,
			userEmail: payload.email,
			message: payload.message,
		}
		const response = await fetch(
			APIConstants.BASE_URL + `/messages/${payload.travellerId}.json`,
			{
				method: 'POST',
				body: JSON.stringify(newMessage),
			}
		)

		const responseData = await response.json()

		if (response.ok) {
			newMessage.id = responseData.name
			newMessage.travellerId = payload.travellerId

			context.commit('addMessage', newMessage)
		} else {
			const error = new Error(
				responseData.message ||
					APIErrorMessageConstants.CONTACT_TRAVELLER
			)
			throw error
		}
	},
	async loadMessages(context) {
		const travellerId = context.rootGetters.userId
		const token = context.rootGetters.token
		const response = await fetch(
			APIConstants.BASE_URL +
				`/messages/${travellerId}.json?auth=` +
				token
		)
		const responseData = await response.json()

		if (response.ok) {
			const messages = []

			for (const key in responseData) {
				const message = {
					id: key,
					travellerId: travellerId,
					userName: responseData[key].userName,
					userEmail: responseData[key].userEmail,
					message: responseData[key].message,
				}
				messages.push(message)
			}

			context.commit('setMessages', messages)
			context.commit('setMessagesCount', messages.length)
		} else {
			const error = new Error(
				responseData.message || APIErrorMessageConstants.FETCH_MESSAGES
			)
			throw error
		}
	},
	async deleteMessage(context, data) {
		try {
			const travellerId = context.rootGetters.userId
			const token = context.rootGetters.token

			const messageId = data.messageId

			const response = await fetch(
				APIConstants.BASE_URL +
					`/messages/${travellerId}/${messageId}.json?auth=` +
					token,
				{
					method: APIConstants.DELETE,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.ok) {
				const responseData = await response.json()

				context.commit('deleteMessage', {
					...responseData,
					id: travellerId,
				})

				await context.dispatch('loadMessages')
			} else {
				throw new Error(APIErrorMessageConstants.DELETE_TRAVELLER)
			}
		} catch (error) {
			// console.error(error)
			throw new Error(APIErrorMessageConstants.CATCH_MESSAGE)
		}
	},
}
