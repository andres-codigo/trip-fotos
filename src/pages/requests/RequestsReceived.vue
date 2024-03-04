<template>
	<section class="requests-received-container">
		<base-dialog
			:show="!!error"
			:isError="!!error"
			:title="dialogTitle"
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<base-card>
				<header class="requests-header">
					<h2>Requests Received</h2>
				</header>
				<base-spinner v-if="isLoading"></base-spinner>
				<ul v-else-if="hasRequests && !isLoading" class="requests">
					<request-item
						v-for="req in receivedRequests"
						:key="req.id"
						:id="req.id"
						:name="req.userName"
						:email="req.userEmail"
						:message="req.message"
					></request-item>
				</ul>
				<h3 v-else class="no-requests">
					You haven't received any requests yet!
				</h3>
			</base-card>
		</section>
	</section>
</template>

<script>
import { GlobalConstants } from '@/constants/global'
import RequestItem from '@/components/requests/RequestItem.vue'

export default {
	components: {
		RequestItem,
	},
	data() {
		return {
			dialogTitle: GlobalConstants.ERROR_DIALOG_TITLE,
			isLoading: false,
			error: null,
		}
	},
	computed: {
		receivedRequests() {
			return this.$store.getters['requests/requests']
		},
		hasRequests() {
			return this.$store.getters['requests/hasRequests']
		},
	},
	created() {
		this.loadRequests()
	},
	methods: {
		async loadRequests() {
			this.isLoading = true
			try {
				await this.$store.dispatch('travellers/updateTravellers')
			} catch (error) {
				this.error = error.message || 'Something failed!'
			}
			this.isLoading = false
		},
		handleError() {
			this.error = null
		},
	},
}
</script>

<style scoped>
.requests-received-container {
	padding: 0 20px;
	.requests-header {
		text-align: center;
	}

	.requests {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.no-requests {
		text-align: center;
		font-weight: 100;
	}
}
</style>
