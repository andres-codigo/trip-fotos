<template>
	<base-dialog
		:show="!!error"
		:isError="!!error"
		:title="dialogTitle"
		@close="handleError"
	>
		<p>{{ error }}</p>
	</base-dialog>
	<div v-if="isLoading" class="spinner-container">
		<base-spinner></base-spinner>
	</div>
	<li
		v-else
		:class="[
			'coach',
			{
				isLoggedInUser: isLoggedInUser(this.id, this.$store.getters.userId),
			},
		]"
	>
		<h3 class="name">
			{{ fullName }}
		</h3>
		<p class="registered">
			{{ registeredDate }}
		</p>
		<p class="description">{{ shortenedDescription }}</p>
		<p class="rate"><strong>Rate:</strong> ${{ rate }}/hour</p>
		<div class="badges">
			<base-badge
				v-for="area in areas"
				:key="area"
				:type="area"
				:title="area"
			></base-badge>
		</div>
		<div class="actions">
			<base-button
				v-if="!isLoggedInUser(this.id, this.$store.getters.userId)"
				mode="outline"
				link
				:to="coachContactLink"
				>Contact</base-button
			>
			<base-button link :to="coachDetailsLink">Details</base-button>
			<!--
				TODO: 	Added to ease deletion of items during development
						Look to incorporate into working flow dependent on
						extension of sign-up.
			-->
			<base-button
				v-if="fullName !== userName"
				@click="this.deleteCoach()"
				mode="outline"
				class="actions delete"
				>Delete</base-button
			>
		</div>
	</li>
</template>

<script>
import { StoreMessagesConstants } from '../../constants/store-messages'
import { DataConstants } from '../../constants/data'
import { GlobalConstants } from '../../constants/global'

import {
	formatDate,
	isLoggedInUser,
	delayLoading,
} from '../../utils/globalFunctions'

export default {
	props: [
		'id',
		'firstName',
		'lastName',
		'description',
		'rate',
		'areas',
		'registered',
	],
	data() {
		return {
			dialogTitle: GlobalConstants.ERROR_DIALOG_TITLE,
			isLoading: false,
			error: null,
		}
	},
	computed: {
		registeredDate() {
			return formatDate(this.registered, DataConstants.DD_MMM_YYYY)
		},
		fullName() {
			return this.firstName + ' ' + this.lastName
		},
		shortenedDescription() {
			let description = this.description.substr(0, 250)

			if (description && description.length === 250) {
				return description + '...'
			}
			return description
		},
		coachContactLink() {
			return this.$route.path + '/' + this.id + '/contact' // /coaches/c1/contact
		},
		coachDetailsLink() {
			return this.$route.path + '/' + this.id // /coaches/c1
		},
		userName() {
			return this.$store.getters['coaches/coachName']
		},
	},
	methods: {
		formatDate,
		isLoggedInUser,
		async deleteCoach() {
			this.isLoading = true
			const numberOfSeconds = 2000

			const deleteCoach = Promise.resolve(
				this.$store.dispatch('coaches/deleteCoach', {
					coachId: this.id,
				})
			)

			const loadCoaches = delayLoading(numberOfSeconds).then(
				this.$store.dispatch('coaches/loadCoaches', {
					forceRefresh: true,
				})
			)

			await Promise.all([deleteCoach, loadCoaches])
				.then(() => {
					this.isLoading = false
				})
				.catch((error) => {
					this.error = error.message || StoreMessagesConstants.GENERIC_MESSAGE
				})
		},
		handleError() {
			this.error = null
		},
	},
}
</script>

<style scoped lang="scss">
.spinner-container {
	margin: 0.5rem 0;
}

.coach {
	border: 1px solid $color-tundora;
	border-radius: 12px;
	margin: 1rem 0;
	padding: 1rem;

	.registered {
		font-size: 0.75rem;
		display: inline;
	}
	.name {
		font-size: 1.5rem;
		margin: 0;
	}

	.description {
		font-style: italic;
	}
	.badges {
		padding: 0.25rem 0 1.25rem 0;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		&.delete {
			background-color: $color-white;
			@include error-text;
			@include invalid-border;
			&:hover {
				background-color: $color-mojo;
				color: $color-white;
			}
		}
	}
}
</style>
