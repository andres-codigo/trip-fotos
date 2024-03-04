<template>
	<section class="traveller-list-container">
		<base-dialog
			:show="!!error"
			:isError="!!error"
			title="An error occurred!"
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<trip-filter @change-filter="setFilters"></trip-filter>
		</section>
		<section>
			<base-card>
				<div class="controls">
					<base-button
						:mode="
							(!hasTravellers && !isLoading) ||
							(filteredTravellers && filteredTravellers.length === 0)
								? 'disabled'
								: 'outline'
						"
						@click="loadTravellers(true)"
						:disabled="!hasTravellers && !isLoading ? true : false"
						:class="{ hide: !hasTravellers && !isLoading }"
						>Refresh</base-button
					>
					<base-button
						v-if="isLoggedIn && !isTraveller && !isLoading"
						link
						to="/register"
						>Register as a Traveller</base-button
					>
				</div>
				<div v-if="isLoading" class="spinner-container">
					<base-spinner></base-spinner>
				</div>
				<ul v-else-if="!isLoading && hasTravellers" class="travellers">
					<trip-item
						v-for="traveller in filteredTravellers"
						:key="traveller.id"
						:id="traveller.id"
						:first-name="traveller.firstName"
						:last-name="traveller.lastName"
						:description="traveller.description"
						:days="traveller.daysInCity"
						:areas="traveller.areas"
						:files="traveller.files"
						:registered="traveller.registered"
					></trip-item>
				</ul>
				<h3 v-if="!hasTravellers && !isLoading">No travellers listed.</h3>
			</base-card>
		</section>
	</section>
</template>

<script>
import TripItem from '@/components/trips/TripItem.vue'
import TripFilter from '@/components/trips/TripFilter.vue'

export default {
	components: {
		TripItem,
		TripFilter,
	},
	data() {
		return {
			isLoading: false,
			error: null,
			activeFilters: {
				tokyo: {
					isActive: true,
				},
				prague: {
					isActive: true,
				},
				sydney: {
					isActive: true,
				},
			},
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated
		},
		isTraveller() {
			return this.$store.getters['travellers/isTraveller']
		},
		travellers() {
			return this.$store.getters['travellers/travellers']
		},
		filteredTravellers() {
			const travellers = this.travellers

			return travellers.filter((traveller) => {
				if (
					this.activeFilters.tokyo.isActive &&
					traveller.areas.includes('tokyo')
				) {
					return true
				}
				if (
					this.activeFilters.prague.isActive &&
					traveller.areas.includes('prague')
				) {
					return true
				}
				if (
					this.activeFilters.sydney.isActive &&
					traveller.areas.includes('sydney')
				) {
					return true
				}
				return false
			})
		},
		hasTravellers() {
			return this.$store.getters['travellers/hasTravellers']
		},
	},
	created() {
		this.loadTravellers()
	},
	methods: {
		setFilters(updatedFilters) {
			this.activeFilters = updatedFilters
		},
		async loadTravellers(refresh = false) {
			try {
				this.isLoading = true
				await this.$store
					.dispatch('travellers/loadTravellers', {
						forceRefresh: refresh,
					})
					.then(() => {
						this.isLoading = false
					})
			} catch (error) {
				this.error = error.message || 'Something went wrong!'
			}
		},
		handleError() {
			this.error = null
		},
	},
}
</script>

<style scoped lang="scss">
.traveller-list-container {
	display: inline;
	padding: 0 20px;
	.controls {
		display: flex;
		justify-content: space-between;
		.hide {
			display: none;
		}
	}
	h3 {
		text-align: center;
	}

	.spinner-container {
		margin: 5rem 0;
	}

	.travellers {
		list-style: none;
		margin: 0;
		padding: 0;
	}
}

@media only screen and (max-width: 768px) {
	.traveller-list-container {
		display: inline-block;
	}
}
</style>
