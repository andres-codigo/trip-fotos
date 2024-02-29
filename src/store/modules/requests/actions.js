import { APIConstants } from '../../../constants/api'
import { APIErrorMessageConstants } from '../../../constants/api-messages'

export default {
	async contactTraveller(context, payload) {
		const newRequest = {
			userName: payload.name,
			userEmail: payload.email,
			message: payload.message,
		}
		const response = await fetch(
			APIConstants.BASE_URL + `/requests/${payload.travellerId}.json`,
			{
				method: 'POST',
				body: JSON.stringify(newRequest),
			}
		)

		const responseData = await response.json()

		if (!response.ok) {
			const error = new Error(
				responseData.message || APIErrorMessageConstants.CONTACT_TRAVELLER
			)
			throw error
		}

		newRequest.id = responseData.name
		newRequest.travellerId = payload.travellerId

		context.commit('addRequest', newRequest)
	},
	async loadRequests(context) {
		const travellerId = context.rootGetters.userId
		const token = context.rootGetters.token
		const response = await fetch(
			APIConstants.BASE_URL + `/requests/${travellerId}.json?auth=` + token
		)
		const responseData = await response.json()

		if (!response.ok) {
			const error = new Error(
				responseData.message || APIErrorMessageConstants.FETCH_REQUESTS
			)
			throw error
		}

		const requests = []

		for (const key in responseData) {
			const request = {
				id: key,
				travellerId: travellerId,
				userName: responseData[key].userName,
				userEmail: responseData[key].userEmail,
				message: responseData[key].message,
			}
			requests.push(request)
		}

		context.commit('setRequests', requests)
		context.commit('setRequestsCount', requests.length)
	},
	async deleteRequest(context, data) {
		try {
			const travellerId = context.rootGetters.userId
			const token = context.rootGetters.token

			const requestId = data.requestId

			const response = await fetch(
				APIConstants.BASE_URL +
					`/requests/${travellerId}/${requestId}.json?auth=` +
					token,
				{
					method: APIConstants.DELETE,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (!response.ok) {
				throw new Error(APIErrorMessageConstants.DELETE_TRAVELLER)
			}

			const responseData = await response.json()

			context.commit('deleteRequest', {
				...responseData,
				id: travellerId,
			})

			await context.dispatch('loadRequests')
		} catch (error) {
			console.error(APIErrorMessageConstants.CATCH_MESSAGE, error)
		}
	},
}
