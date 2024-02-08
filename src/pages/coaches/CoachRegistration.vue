<template>
	<section>
		<base-card>
			<h2>Register as a coach now!</h2>
			<coach-form @register-coach="registerCoach"></coach-form>
		</base-card>
	</section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'

export default {
	components: {
		CoachForm,
	},
	methods: {
		registerCoach(data) {
			this.$store.dispatch('coaches/registerCoach', data)
			this.$store.dispatch('coaches/coachName', data)
			this.$router.replace('/coaches')
		},
	},
}
</script>
