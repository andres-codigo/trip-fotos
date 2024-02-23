<template>
	<section class="coach-detail-container">
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
					<p>{{ this.selectedCoach.description }}</p>
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
				</div>
				<div class="images">
					<div v-if="isLoadingImages" class="spinner-container-images">
						<base-spinner></base-spinner>
					</div>
					<ul v-else class="images-list" v-show="!!images">
						<base-image
							v-for="file in this.images"
							:key="file.index"
							:url="file.url"
							:title="fullName"
						></base-image>
					</ul>
				</div>
			</base-card>
		</section>
		<section
			:class="{ isLoading: isLoading }"
			v-if="!isLoggedInUser(this.id, this.$store.getters.userId) && isCoach"
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
	</section>
</template>

<script>
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'

import { isLoggedInUser } from '../../utils/globalFunctions'

export default {
	props: ['id'],
	data() {
		return {
			isLoading: false,
			selectedCoach: {},
			error: '',
			isLoadingImages: false,
			images: [],
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
		isCoach() {
			return this.$store.getters['coaches/isCoach']
		},
	},
	watch: {
		coach(details) {
			this.selectedCoach = details
		},
	},
	created() {
		this.loadCoach()
		this.getImages()
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
		getImages() {
			const storage = getStorage()
			const spaceRef = ref(storage, `images/${this.id}`)

			if (spaceRef.name === this.id) {
				listAll(spaceRef)
					.then((res) => {
						res.items.forEach(async (itemRef, index) => {
							this.isLoadingImages = true
							await getDownloadURL(itemRef)
								.then((downloadURL) => {
									let image = {
										index: index,
										url: downloadURL,
									}
									this.images.push(image)
								})
								.finally(() => {
									this.isLoadingImages = false
								})
								.catch((error) => {
									console.log(error)
								})
						})
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},
	},
}
</script>

<style scoped lang="scss">
.coach-detail-container {
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
