<template>
	<section class="traveller-registration-container">
		<base-dialog
			:show="!!error"
			:isError="!!error"
			:title="dialogTitle"
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<base-card>
			<div v-if="isLoading" class="spinner-container">
				<base-spinner></base-spinner>
			</div>
			<div v-else>
				<h2>Register as a traveller now!</h2>
				<traveller-form
					@register-traveller="registerTraveller"
				></traveller-form>
			</div>
		</base-card>
	</section>
</template>

<script>
import { delayLoading } from '../../utils/globalFunctions'
import { StoreMessagesConstants } from '../../constants/store-messages'
import { GlobalConstants } from '../../constants/global'

import TravellerForm from '../../components/trips/TravellerForm.vue'

export default {
	data() {
		return {
			dialogTitle: GlobalConstants.ERROR_DIALOG_TITLE,
			isLoading: false,
			error: null,
		}
	},
	components: {
		TravellerForm,
	},
	methods: {
		async registerTraveller(data) {
			this.isLoading = true
			const numberOfSeconds = 2000

			const registerTraveller = Promise.resolve(
				this.$store.dispatch('travellers/registerTraveller', data)
			)

			const setTravellerName = Promise.resolve(
				this.$store.dispatch('travellers/travellerName', data)
			)

			const loadTravellers = Promise.resolve(
				this.$store.dispatch('travellers/loadTravellers', {
					forceRefresh: true,
				})
			)

			const routeToTravellersPage = delayLoading(numberOfSeconds).then(
				this.$router.replace('/trips')
			)

			await Promise.all([
				registerTraveller,
				setTravellerName,
				loadTravellers,
				routeToTravellersPage,
			])
				.then(() => {
					this.isLoading = false
				})
				.catch((error) => {
					this.error = error.message || StoreMessagesConstants.GENERIC_MESSAGE
				})
		},
		handleError() {
			this.error = null
		},
	},
}
</script>

<style scoped lang="scss">
.traveller-registration-container {
	padding: 0 20px;
}
</style>
