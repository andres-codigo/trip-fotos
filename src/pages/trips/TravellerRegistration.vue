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
			<h2 v-if="registeringUser">
				Registering you as a traveller, one moment please...
			</h2>
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
import { StoreMessagesConstants } from '../../constants/store-messages'
import { GlobalConstants } from '../../constants/global'

import TravellerForm from '../../components/trips/TravellerForm.vue'

export default {
	data() {
		return {
			dialogTitle: GlobalConstants.ERROR_DIALOG_TITLE,
			isLoading: false,
			registeringUser: false,
			error: null,
		}
	},
	components: {
		TravellerForm,
	},
	methods: {
		async registerTraveller(data) {
			this.registeringUser = true
			this.isLoading = true

			const registerTraveller = Promise.resolve(
				this.$store.dispatch('travellers/registerTraveller', data)
			)

			const setTravellerName = Promise.resolve(
				this.$store.dispatch('travellers/travellerName', data)
			)

			await Promise.all([registerTraveller, setTravellerName])
				.then(() => {
					this.$store.dispatch('travellers/loadTravellers', {
						forceRefresh: true,
					})
				})
				.then(() => {
					this.$router.replace('/trips')
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
