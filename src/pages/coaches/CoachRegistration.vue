<template>
	<section>
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
				<h2>Register as a coach now!</h2>
				<coach-form @register-coach="registerCoach"></coach-form>
			</div>
		</base-card>
	</section>
</template>

<script>
import { delayLoading } from '../../utils/globalFunctions'
import { StoreMessagesConstants } from '../../constants/store-messages'
import { GlobalConstants } from '../../constants/global'

import CoachForm from '../../components/coaches/CoachForm.vue'

export default {
	data() {
		return {
			dialogTitle: GlobalConstants.ERROR_DIALOG_TITLE,
			isLoading: false,
			error: null,
		}
	},
	components: {
		CoachForm,
	},
	methods: {
		async registerCoach(data) {
			this.isLoading = true
			const numberOfSeconds = 2000

			const registerCoach = Promise.resolve(
				this.$store.dispatch('coaches/registerCoach', data)
			)

			const setCoachName = Promise.resolve(
				this.$store.dispatch('coaches/coachName', data)
			)

			const loadCoaches = Promise.resolve(
				this.$store.dispatch('coaches/loadCoaches', {
					forceRefresh: true,
				})
			)

			const routeToCoachesPage = delayLoading(numberOfSeconds).then(
				this.$router.replace('/coaches')
			)

			await Promise.all([
				registerCoach,
				setCoachName,
				loadCoaches,
				routeToCoachesPage,
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
