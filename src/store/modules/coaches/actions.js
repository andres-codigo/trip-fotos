import { APIConstants } from '../../../constants/api'
import { APIErrorMessageConstants } from '../../../constants/api-messages'

export default {
	async registerCoach(context, data) {
		try {
			const userId = context.rootGetters.userId
			const coachData = {
				firstName: data.first,
				lastName: data.last,
				description: data.desc,
				hourlyRate: data.rate,
				areas: data.areas,
				files: data.files,
			}

			const token = context.rootGetters.token

			const response = await fetch(
				APIConstants.BASE_URL + `/coaches/${userId}.json?auth=` + token,
				{
					method: APIConstants.PUT,
					body: JSON.stringify(coachData),
				}
			)

			if (response.ok) {
				context.commit('registerCoach', {
					...coachData,
					id: userId,
				})
			} else {
				throw new Error(APIErrorMessageConstants.REGISTER_COACH)
			}
		} catch (error) {
			console.error(APIErrorMessageConstants.CATCH_MESSAGE, error)
		}
	},

	async coachName(context, data) {
		try {
			const coachData = {
				firstName: data.first,
				lastName: data.last,
			}

			const token = context.rootGetters.token

			const coachName = coachData.firstName + ' ' + coachData.lastName

			const response = await fetch(
				APIConstants.API_URL + 'update?key=' + APIConstants.API_KEY,
				{
					method: APIConstants.POST,
					body: JSON.stringify({
						idToken: token,
						displayName: coachName,
					}),
				}
			)

			if (!response.ok) {
				throw new Error(APIErrorMessageConstants.LOAD_COACH_NAME)
			}

			const updateResponse = await response.json()

			localStorage.setItem('userName', updateResponse.displayName)
			context.commit('setCoachName', updateResponse.displayName)
		} catch (error) {
			console.error(APIErrorMessageConstants.CATCH_MESSAGE, error)
		}
	},

	async loadCoach(context, data) {
		try {
			const coachId = data.coachId

			const response = await fetch(
				APIConstants.BASE_URL + `/coaches/${coachId}.json`,
				{
					method: APIConstants.GET,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (!response.ok) {
				throw new Error(APIErrorMessageConstants.LOAD_COACH)
			}

			const responseData = await response.json()

			context.commit('setCoach', {
				...responseData,
				id: coachId,
			})
		} catch (error) {
			console.error(APIErrorMessageConstants.CATCH_MESSAGE, error)
		}
	},

	async deleteCoach(context, data) {
		try {
			const coachId = data.coachId

			const token = context.rootGetters.token

			const response = await fetch(
				APIConstants.BASE_URL + `/coaches/${coachId}.json?auth=` + token,
				{
					method: APIConstants.DELETE,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (!response.ok) {
				throw new Error(APIErrorMessageConstants.DELETE_COACH)
			}

			const responseData = await response.json()

			context.commit('deleteCoach', {
				...responseData,
				id: coachId,
			})
		} catch (error) {
			console.error(APIErrorMessageConstants.CATCH_MESSAGE, error)
		}
	},

	async loadCoaches(context, payload) {
		try {
			if (!payload.forceRefresh && !context.getters.shouldUpdate) {
				return
			}
			const response = await fetch(APIConstants.BASE_URL + `/coaches.json`, {
				method: APIConstants.GET,
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!response.ok) {
				throw new Error(APIErrorMessageConstants.LOAD_COACHES)
			}

			const responseData = await response.json()

			const coaches = []

			for (const key in responseData) {
				const coach = {
					id: key,
					firstName: responseData[key].firstName,
					lastName: responseData[key].lastName,
					description: responseData[key].description,
					hourlyRate: responseData[key].hourlyRate,
					areas: responseData[key].areas,
					files: responseData[key].files,
				}
				coaches.push(coach)
			}

			context.commit('setCoaches', coaches)
			context.commit('setFetchTimestamp')
		} catch (error) {
			console.error(APIErrorMessageConstants.CATCH_MESSAGE, error)
		}
	},
}
