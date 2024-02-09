<template>
	<section>
		<base-card>
			<div v-if="isLoading" class="spinner-container">
				<base-spinner></base-spinner>
			</div>
			<h2>Register as a coach now!</h2>
			<coach-form @register-coach="registerCoach"></coach-form>
		</base-card>
	</section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'

import { StoreMessagesConstants } from '../../constants/store-messages'

export default {
	data() {
		return {
			isLoading: false,
			error: '',
		}
	},
	components: {
		CoachForm,
	},
	methods: {
		delayLoading(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms))
		},
		async registerCoach(data) {
			this.isLoading = true
			const numberOfSeconds = 2000

			const registerCoach = Promise.resolve(
				this.$store.dispatch('coaches/registerCoach', data)
			)

			const setCoachName = Promise.resolve(
				this.$store.dispatch('coaches/coachName', data)
			)

			const routeToCoachesPage = this.delayLoading(numberOfSeconds).then(
				this.$router.replace('/coaches')
			)

			await Promise.all([registerCoach, setCoachName, routeToCoachesPage])
				.then(() => {
					this.isLoading = false
				})
				.catch((error) => {
					this.error = error.message || StoreMessagesConstants.GENERIC_MESSAGE
				})
		},
	},
}
</script>
