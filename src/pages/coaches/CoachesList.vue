<template>
	<section class="coach-list-container">
		<base-dialog
			:show="!!error"
			:isError="!!error"
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
						:mode="
							(!hasCoaches && !isLoading) ||
							(filteredCoaches && filteredCoaches.length === 0)
								? 'disabled'
								: 'outline'
						"
						@click="loadCoaches(true)"
						:disabled="!hasCoaches && !isLoading ? true : false"
						:class="{ hide: !hasCoaches && !isLoading }"
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
				<ul v-else-if="hasCoaches" class="coaches">
					<coach-item
						v-for="coach in filteredCoaches"
						:key="coach.id"
						:id="coach.id"
						:first-name="coach.firstName"
						:last-name="coach.lastName"
						:description="coach.description"
						:rate="coach.hourlyRate"
						:areas="coach.areas"
						:registered="coach.registered"
					></coach-item>
				</ul>
				<h3 v-if="!hasCoaches && !isLoading">No coaches listed.</h3>
				<h3
					v-else-if="
						coaches &&
						coaches.length > 0 &&
						filteredCoaches &&
						filteredCoaches.length === 0
					"
				>
					No coaches to display.
				</h3>
			</base-card>
		</section>
	</section>
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
		coaches() {
			const coaches = this.$store.getters['coaches/coaches']
			return coaches
		},
		filteredCoaches() {
			const coaches = this.coaches

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
.coach-list-container {
	display: inline;
	padding: 0 20px;
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

	.coaches {
		list-style: none;
		margin: 0;
		padding: 0;
	}
}

@media only screen and (max-width: 768px) {
	.coach-list-container {
		display: inline-block;
	}
}
</style>
