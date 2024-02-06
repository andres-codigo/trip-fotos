<template>
	<div>
		<section>
			<base-card
				:class="{
					isLoggedInUser: isLoggedInUser(this.id, this.$store.getters.userId),
				}"
			>
				<div v-if="isLoading" class="spinner-container">
					<base-spinner></base-spinner>
				</div>
				<div v-else>
					<h2>{{ fullName }}</h2>
					<h3>${{ this.selectedCoach.hourlyRate }}/hour</h3>
				</div>
			</base-card>
		</section>
		<section :class="{ isLoading: isLoading }">
			<base-card>
				<div>
					<base-badge
						v-for="area in this.selectedCoach.areas"
						:key="area"
						:type="area"
						:title="area"
					></base-badge>
					<p>{{ this.selectedCoach.description }}</p>
				</div>
			</base-card>
		</section>
		<section
			:class="{ isLoading: isLoading }"
			v-if="!isLoggedInUser(this.id, this.$store.getters.userId)"
		>
			<base-card>
				<header>
					<h2>Interested? Reach out now!</h2>
					<base-button
						v-if="this.$route.name !== 'contact-coach'"
						link
						:to="contactLink"
						>Contact</base-button
					>
				</header>
				<router-view></router-view>
			</base-card>
		</section>
	</div>
</template>

<script>
import { isLoggedInUser } from '../../utils/globalFunctions'

export default {
	props: ['id'],
	data() {
		return {
			isLoading: false,
			selectedCoach: {},
			error: '',
		}
	},
	computed: {
		fullName() {
			return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
		},
		contactLink() {
			return this.$route.path + '/contact'
		},
		coach() {
			return this.$store.getters['coaches/coach']
		},
	},
	watch: {
		coach(details) {
			this.selectedCoach = details
		},
	},
	created() {
		this.loadCoach()
	},
	methods: {
		isLoggedInUser,
		async loadCoach() {
			this.isLoading = true
			try {
				await this.$store.dispatch('coaches/loadCoach', {
					coachId: this.id,
				})
			} catch (error) {
				this.error = error.message || 'Something went wrong!'
			}
			this.isLoading = false
		},
	},
}
</script>

<style scoped>
.isLoading {
	display: none;
}
</style>
