<template>
	<div>
		<section>
			<base-card
				:class="{
					isLoggedInUser: isLoggedInUser(this.id, this.$store.getters.userId),
				}"
			>
				<h2>{{ fullName }}</h2>
				<h3>${{ rate }}/hour</h3>
			</base-card>
		</section>
		<section v-if="!isLoggedInUser(this.id, this.$store.getters.userId)">
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
		<section>
			<base-card>
				<base-badge
					v-for="area in areas"
					:key="area"
					:type="area"
					:title="area"
				></base-badge>
				<p>{{ description }}</p>
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
			selectedCoach: null,
		}
	},
	computed: {
		fullName() {
			return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
		},
		areas() {
			return this.selectedCoach.areas
		},
		rate() {
			return this.selectedCoach.hourlyRate
		},
		description() {
			return this.selectedCoach.description
		},
		contactLink() {
			return this.$route.path + '/contact'
		},
	},
	created() {
		this.selectedCoach = this.$store.getters['coaches/coaches'].find(
			(coach) => coach.id === this.id
		)
	},
	methods: {
		isLoggedInUser,
	},
}
</script>
