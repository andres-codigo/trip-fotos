const firebaseConfig = {
	apiUrl: process.env.VUE_APP_API_URL,
	apiKey: process.env.VUE_APP_API_KEY,
	databaseUrl: process.env.VUE_APP_DATABASE_URL,
}

import { FETCH_ERROR_MESSAGE } from '../../consts'

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
				firebaseConfig.databaseUrl + `/coaches/${userId}.json?auth=` + token,
				{
					method: 'PUT',
					body: JSON.stringify(coachData),
				}
			)

			if (!response.ok) {
				throw new Error('Failed to load register coach.')
			}

			context.commit('registerCoach', {
				...coachData,
				id: userId,
			})
		} catch (error) {
			console.error(FETCH_ERROR_MESSAGE, error)
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
				firebaseConfig.apiUrl + 'update?key=' + firebaseConfig.apiKey,
				{
					method: 'POST',
					body: JSON.stringify({
						idToken: token,
						displayName: coachName,
					}),
				}
			)

			if (!response.ok) {
				throw new Error('Failed to load coach name.')
			}

			const updateResponse = await response.json()

			localStorage.setItem('userName', updateResponse.displayName)
			context.commit('setCoachName', updateResponse.displayName)
		} catch (error) {
			console.error(FETCH_ERROR_MESSAGE, error)
		}
	},

	async loadCoach(context, data) {
		try {
			const coachId = data.coachId

			const response = await fetch(
				firebaseConfig.databaseUrl + `/coaches/${coachId}.json`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (!response.ok) {
				throw new Error('Failed to load coach.')
			}

			const responseData = await response.json()

			context.commit('setCoach', {
				...responseData,
				id: coachId,
			})
		} catch (error) {
			console.error(FETCH_ERROR_MESSAGE, error)
		}
	},

	async deleteCoach(context, data) {
		try {
			const coachId = data.coachId

			const token = context.rootGetters.token

			const response = await fetch(
				firebaseConfig.databaseUrl + `/coaches/${coachId}.json?auth=` + token,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (!response.ok) {
				throw new Error('Failed to delete coach.')
			}

			const responseData = await response.json()

			context.commit('deleteCoach', {
				...responseData,
				id: coachId,
			})
		} catch (error) {
			console.error(FETCH_ERROR_MESSAGE, error)
		}
	},

	async loadCoaches(context, payload) {
		try {
			if (!payload.forceRefresh && !context.getters.shouldUpdate) {
				return
			}
			const response = await fetch(
				firebaseConfig.databaseUrl + `/coaches.json`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (!response.ok) {
				throw new Error('Failed to load coaches.')
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
			console.error(FETCH_ERROR_MESSAGE, error)
		}
	},
}
