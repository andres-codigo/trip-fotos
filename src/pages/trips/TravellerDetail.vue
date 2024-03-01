<template>
	<section class="traveller-detail-container">
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
					<p>{{ this.selectedTraveller.description }}</p>
					<h3>${{ this.selectedTraveller.daysInCity }}/hour</h3>
				</div>
			</base-card>
		</section>
		<section :class="{ isLoading: isLoading }">
			<base-card>
				<div>
					<base-badge
						v-for="area in this.selectedTraveller.areas"
						:key="area"
						:type="area"
						:title="area"
					></base-badge>
				</div>
				<div class="images">
					<ul class="images-list" v-show="!!this.selectedTraveller.files">
						<base-image
							v-for="file in this.selectedTraveller.files"
							:key="file"
							:url="file"
							:title="fullName"
						></base-image>
					</ul>
				</div>
			</base-card>
		</section>
		<section
			:class="{ isLoading: isLoading }"
			v-if="!isLoggedInUser(this.id, this.$store.getters.userId) && isTraveller"
		>
			<base-card>
				<header>
					<h2>Interested? Reach out now!</h2>
					<base-button
						v-if="this.$route.name !== 'contact-traveller'"
						link
						:to="contactLink"
						>Contact</base-button
					>
				</header>
				<router-view></router-view>
			</base-card>
		</section>
	</section>
</template>

<script>
import { isLoggedInUser } from '../../utils/globalFunctions'

export default {
	props: ['id'],
	data() {
		return {
			isLoading: false,
			selectedTraveller: {},
			error: '',
		}
	},
	computed: {
		fullName() {
			return (
				this.selectedTraveller.firstName + ' ' + this.selectedTraveller.lastName
			)
		},
		contactLink() {
			return this.$route.path + '/contact'
		},
		traveller() {
			return this.$store.getters['travellers/traveller']
		},
		isTraveller() {
			return this.$store.getters['travellers/isTraveller']
		},
	},
	watch: {
		traveller(details) {
			this.selectedTraveller = details
		},
	},
	created() {
		this.loadTraveller()
	},
	methods: {
		isLoggedInUser,
		async loadTraveller() {
			this.isLoading = true
			try {
				await this.$store.dispatch('travellers/loadTraveller', {
					travellerId: this.id,
				})
			} catch (error) {
				this.error = error.message || 'Something went wrong!'
			}
			this.isLoading = false
		},
	},
}
</script>

<style scoped lang="scss">
.traveller-detail-container {
	padding: 0 20px;
	.isLoading {
		display: none;
	}

	.spinner-container-images {
		height: 146.797px;
		@include fadeIn(ease, 2s, 1, forwards);
	}

	.images {
		.images-list {
			display: flex;
			flex-wrap: wrap;
			list-style: none;
			padding: 0;

			@include fadeIn(ease, 2s, 1, forwards);
		}
	}
}
</style>
