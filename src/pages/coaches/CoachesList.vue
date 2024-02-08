CoachesList

<template>
	<div>
		<base-dialog
			:show="!!error"
			title="An error occurred!"
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<coach-filter @change-filter="setFilters"></coach-filter>
		</section>
		<section>
			<base-card>
				<div class="controls">
					<base-button
						:mode="!hasCoaches ? 'disabled' : 'outline'"
						@click="loadCoaches(true)"
						:disabled="!hasCoaches ? true : false"
						:class="{ hide: !hasCoaches }"
						>Refresh</base-button
					>
					<base-button
						v-if="isLoggedIn && !isCoach && !isLoading"
						link
						to="/register"
						>Register as a Coach</base-button
					>
				</div>
				<div v-if="isLoading" class="spinner-container">
					<base-spinner></base-spinner>
				</div>
				<ul v-else-if="hasCoaches">
					<coach-item
						v-for="coach in filteredCoaches"
						:key="coach.id"
						:id="coach.id"
						:first-name="coach.firstName"
						:last-name="coach.lastName"
						:description="coach.description"
						:rate="coach.hourlyRate"
						:areas="coach.areas"
					></coach-item>
				</ul>
				<h3 v-else>No coaches found.</h3>
			</base-card>
		</section>
	</div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue'
import CoachFilter from '../../components/coaches/CoachFilter.vue'

export default {
	components: {
		CoachItem,
		CoachFilter,
	},
	data() {
		return {
			isLoading: false,
			error: null,
			activeFilters: {
				frontend: {
					isActive: true,
				},
				backend: {
					isActive: true,
				},
				career: {
					isActive: true,
				},
			},
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated
		},
		isCoach() {
			return this.$store.getters['coaches/isCoach']
		},
		filteredCoaches() {
			const coaches = this.$store.getters['coaches/coaches']
			return coaches.filter((coach) => {
				if (
					this.activeFilters.frontend.isActive &&
					coach.areas.includes('frontend')
				) {
					return true
				}
				if (
					this.activeFilters.backend.isActive &&
					coach.areas.includes('backend')
				) {
					return true
				}
				if (
					this.activeFilters.career.isActive &&
					coach.areas.includes('career')
				) {
					return true
				}
				return false
			})
		},
		hasCoaches() {
			return !this.isLoading && this.$store.getters['coaches/hasCoaches']
		},
	},
	created() {
		this.loadCoaches()
	},
	methods: {
		setFilters(updatedFilters) {
			this.activeFilters = updatedFilters
		},
		async loadCoaches(refresh = false) {
			this.isLoading = true
			try {
				await this.$store.dispatch('coaches/loadCoaches', {
					forceRefresh: refresh,
				})
			} catch (error) {
				this.error = error.message || 'Something went wrong!'
			}
			this.isLoading = false
		},
		handleError() {
			this.error = null
		},
	},
}
</script>

<style scoped lang="scss">
.controls {
	display: flex;
	justify-content: space-between;
	.hide {
		display: none;
	}
}

.spinner-container {
	margin: 5rem 0;
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
}
</style>
