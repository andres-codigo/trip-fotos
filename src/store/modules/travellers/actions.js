import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { APIConstants } from '../../../constants/api'
import { APIErrorMessageConstants } from '../../../constants/api-messages'

export default {
	async registerTraveller(context, data) {
		try {
			const userId = context.rootGetters.userId

			const imagePromises = await Promise.all(
				Array.from(data.files, async (image) => {
					const storage = getStorage()
					const storageRef = ref(storage, `/images/${userId}/${image.name}`)

					const metadata = {
						customMetadata: {
							userId: userId,
						},
					}

					const response = await uploadBytes(storageRef, image.file, metadata)
					const url = await getDownloadURL(response.ref)

					return url
				})
			)

			const travellerData = {
				firstName: data.first,
				lastName: data.last,
				description: data.desc,
				daysInCity: data.days,
				areas: data.areas,
				files: imagePromises,
				registered: new Date(),
			}

			const token = context.rootGetters.token

			const response = await fetch(
				APIConstants.BASE_URL + `/travellers/${userId}.json?auth=` + token,
				{
					method: APIConstants.PUT,
					body: JSON.stringify(travellerData),
				}
			)

			if (response.ok) {
				context.commit('registerTraveller', {
					...travellerData,
					id: userId,
				})
			} else {
				throw new Error(APIErrorMessageConstants.REGISTER_TRAVELLER)
			}
		} catch (error) {
			console.error(APIErrorMessageConstants.CATCH_MESSAGE, error)
		}
	},

	async travellerName(context, data) {
		try {
			const travellerName = data.first + ' ' + data.last

			const response = await fetch(
				APIConstants.API_URL + 'update?key=' + APIConstants.API_KEY,
				{
					method: APIConstants.POST,
					body: JSON.stringify({
						idToken: context.rootGetters.token,
						displayName: travellerName,
					}),
				}
			)

			if (response.ok) {
				const updateResponse = await response.json()

				localStorage.setItem('userName', updateResponse.displayName)
				context.commit('setTravellerName', updateResponse.displayName)
			} else {
				throw new Error(APIErrorMessageConstants.LOAD_TRAVELLER_NAME)
			}
		} catch (error) {
			console.error(APIErrorMessageConstants.CATCH_MESSAGE, error)
		}
	},

	async loadTraveller(context, data) {
		try {
			const travellerId = data.travellerId

			const response = await fetch(
				APIConstants.BASE_URL + `/travellers/${travellerId}.json`,
				{
					method: APIConstants.GET,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.ok) {
				const responseData = await response.json()

				context.commit('setTraveller', {
					...responseData,
					id: travellerId,
				})
			} else {
				throw new Error(APIErrorMessageConstants.LOAD_TRAVELLER)
			}
		} catch (error) {
			console.error(APIErrorMessageConstants.CATCH_MESSAGE, error)
		}
	},

	async updateTravellers(context) {
		const response = await fetch(APIConstants.BASE_URL + `/travellers.json`, {
			method: APIConstants.GET,
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (response.ok) {
			const responseData = await response.json()

			const travellers = []

			for (const key in responseData) {
				const traveller = {
					id: key,
					firstName: responseData[key].firstName,
					lastName: responseData[key].lastName,
					description: responseData[key].description,
					daysInCity: responseData[key].daysInCity,
					areas: responseData[key].areas,
					files: responseData[key].files,
					registered: responseData[key].registered,
				}
				travellers.push(traveller)
			}

			const loggedInTraveller = travellers.find(
				(traveller) => traveller.id === localStorage.userId
			)

			const filteredTraveller = travellers.filter(
				(traveller) => traveller.id !== localStorage.userId
			)

			if (loggedInTraveller !== undefined) {
				filteredTraveller.unshift(loggedInTraveller)
				context.commit(
					'setTravellerName',
					loggedInTraveller.firstName + ' ' + loggedInTraveller.lastName
				)
				context.commit('setTravellers', filteredTraveller)
			} else {
				context.commit('setTravellers', travellers)
			}
		} else {
			throw new Error(APIErrorMessageConstants.LOAD_TRAVELLERS)
		}
	},

	async deleteTraveller(context, data) {
		try {
			const travellerId = data.travellerId

			const token = context.rootGetters.token

			const response = await fetch(
				APIConstants.BASE_URL + `/travellers/${travellerId}.json?auth=` + token,
				{
					method: APIConstants.DELETE,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			if (response.ok) {
				const responseData = await response.json()

				context.commit('deleteTraveller', {
					...responseData,
					id: travellerId,
				})

				await context.dispatch('updateTravellers')
			} else {
				throw new Error(APIErrorMessageConstants.DELETE_TRAVELLER)
			}
		} catch (error) {
			console.error(APIErrorMessageConstants.CATCH_MESSAGE, error)
		}
	},

	async loadTravellers(context, payload) {
		try {
			if (!payload.forceRefresh && !context.getters.shouldUpdate) {
				return
			}

			await context.dispatch('updateTravellers')
			context.commit('setFetchTimestamp')
		} catch (error) {
			console.error(APIErrorMessageConstants.CATCH_MESSAGE, error)
		}
	},
}
