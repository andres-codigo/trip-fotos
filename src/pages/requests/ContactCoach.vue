<template>
	<contact-coach-form @save-data="saveData"></contact-coach-form>
</template>

<script>
import ContactCoachForm from '../../components/requests/ContactCoachForm.vue'

export default {
	components: {
		ContactCoachForm,
	},
	methods: {
		saveData(data) {
			this.$store.dispatch('requests/contactCoach', data)
			this.$router.replace('/coaches')
		},
	},
}
</script>
