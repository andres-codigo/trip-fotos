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
				`https://trip-fotos-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=` +
					token,
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
			console.error(
				'There has been a problem with your fetch operation:',
				error
			)
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
				'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAWj0EzBooyl5xKqQcizA7xyxvjMJgPMHY',
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
			console.error(
				'There has been a problem with your fetch operation:',
				error
			)
		}
	},

	async loadCoach(context, data) {
		try {
			const coachId = data.coachId

			const response = await fetch(
				`https://trip-fotos-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${coachId}.json`,
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
			console.error(
				'There has been a problem with your fetch operation:',
				error
			)
		}
	},

	async deleteCoach(context, data) {
		try {
			const coachId = data.coachId

			const token = context.rootGetters.token

			const response = await fetch(
				`https://trip-fotos-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${coachId}.json?auth=` +
					token,
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
			console.error(
				'There has been a problem with your fetch operation:',
				error
			)
		}
	},

	async loadCoaches(context, payload) {
		try {
			if (!payload.forceRefresh && !context.getters.shouldUpdate) {
				return
			}
			const response = await fetch(
				`https://trip-fotos-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`,
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
			console.error(
				'There has been a problem with your fetch operation:',
				error
			)
		}
	},
}
