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
	<li v-else class="request">
		<div class="container">
			<h4>From</h4>
			<p>
				{{ name }}
			</p>
		</div>
		<div class="container">
			<h4>Email</h4>
			<p>
				<a :href="emailLink">{{ email }}</a>
			</p>
		</div>
		<div class="container">
			<h4>Message</h4>
			<p>{{ message }}</p>
		</div>
		<div class="actions">
			<base-button
				@click="this.deleteRequest()"
				mode="outline"
				class="actions delete"
				>Delete</base-button
			>
		</div>
	</li>
</template>

<script>
import { StoreMessagesConstants } from '../../constants/store-messages'
import { GlobalConstants } from '../../constants/global'
import { delayLoading } from '../../utils/globalFunctions'

export default {
	props: ['id', 'name', 'email', 'message'],
	data() {
		return {
			dialogTitle: GlobalConstants.ERROR_DIALOG_TITLE,
			isLoading: false,
			error: null,
		}
	},
	computed: {
		emailLink() {
			return 'mailto:' + this.email
		},
	},
	methods: {
		async deleteRequest() {
			const numberOfSeconds = 2000
			this.isLoading = true

			const deleteRequest = Promise.resolve(
				this.$store.dispatch('requests/deleteRequest', {
					requestId: this.id,
				})
			)

			const loadRequests = delayLoading(numberOfSeconds).then(
				this.$store.dispatch('requests/loadRequests')
			)

			await Promise.all([deleteRequest, loadRequests])
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
.request {
	border: 1px solid $color-tundora;
	border-radius: 12px;
	margin: 1rem 0;
	padding: 1rem;

	.container {
		margin-bottom: 0.75rem;

		h4 {
			margin: 0.25rem 0;
		}

		p {
			margin: 0 0 0.25rem 0;
			a {
				color: $color-pigment-indigo;
				text-decoration: none;
				font-weight: bold;

				&:hover,
				&:active {
					color: $color-fresh-eggplant;
				}
			}
		}
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
