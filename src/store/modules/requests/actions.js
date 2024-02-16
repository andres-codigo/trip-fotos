import { APIConstants } from '../../../constants/api'
import { APIErrorMessageConstants } from '../../../constants/api-messages'

export default {
	async contactCoach(context, payload) {
		const newRequest = {
			userName: payload.name,
			userEmail: payload.email,
			message: payload.message,
		}
		const response = await fetch(
			APIConstants.BASE_URL + `/requests/${payload.coachId}.json`,
			{
				method: 'POST',
				body: JSON.stringify(newRequest),
			}
		)

		const responseData = await response.json()

		if (!response.ok) {
			const error = new Error(
				responseData.message || APIErrorMessageConstants.CONTACT_COACH
			)
			throw error
		}

		newRequest.id = responseData.name
		newRequest.coachId = payload.coachId

		context.commit('addRequest', newRequest)
	},
	async fetchRequests(context) {
		const coachId = context.rootGetters.userId
		const token = context.rootGetters.token
		const response = await fetch(
			APIConstants.BASE_URL + `/requests/${coachId}.json?auth=` + token
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
				coachId: coachId,
				userName: responseData[key].userName,
				userEmail: responseData[key].userEmail,
				message: responseData[key].message,
			}
			requests.push(request)
		}

		context.commit('setRequests', requests)
		context.commit('setRequestsCount', requests.length)
	},
}
