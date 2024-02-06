export default {
	async coachName(context, data) {
		const coachData = {
			firstName: data.first,
			lastName: data.last,
		}

		const token = context.rootGetters.token

		const coachName = coachData.firstName + ' ' + coachData.lastName

		const updateProfile = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAWj0EzBooyl5xKqQcizA7xyxvjMJgPMHY',
			{
				method: 'POST',
				body: JSON.stringify({
					idToken: token,
					displayName: coachName,
				}),
			}
		)

		const updateResponse = await updateProfile.json()

		localStorage.setItem('userName', updateResponse.displayName)
		context.commit('setCoachName', updateResponse.displayName)
	},
	async registerCoach(context, data) {
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
			`https://trip-fotos-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=` +
				token,
			{
				method: 'PUT',
				body: JSON.stringify(coachData),
			}
		)

		const responseData = await response.json()

		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to load coaches.')
			throw error
		}

		context.commit('registerCoach', {
			...coachData,
			id: userId,
		})
	},

	async loadCoach(context, data) {
		const coachId = data.coachId

		const response = await fetch(
			`https://trip-fotos-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${coachId}.json`
		)

		const responseData = await response.json()

		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to load coaches.')
			throw error
		}

		context.commit('setCoach', {
			...responseData,
			id: coachId,
		})
	},

	async loadCoaches(context, payload) {
		if (!payload.forceRefresh && !context.getters.shouldUpdate) {
			return
		}
		const response = await fetch(
			`https://trip-fotos-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
		)
		const responseData = await response.json()

		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to fetch!')
			throw error
		}

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
	},
}
