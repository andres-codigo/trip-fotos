<template>
	<base-card>
		<h2 class="filter-header">Filter by city</h2>
		<div class="checkbox-container">
			<span
				:class="['filter-option', { active: value.isActive }]"
				v-for="(value, key) in filters"
				:key="key"
			>
				<input type="checkbox" :id="key" checked @change="setFilter" />
				<label :for="key">{{ key }}</label>
			</span>
		</div>
	</base-card>
</template>

<script>
export default {
	emits: ['change-filter'],
	data() {
		return {
			filters: {
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
	methods: {
		setFilter(event) {
			const inputId = event.target.id
			const isChecked = event.target.checked
			const updatedFilters = {
				...this.filters,
				[inputId]: {
					isActive: isChecked,
				},
			}
			this.filters = updatedFilters
			this.$emit('change-filter', updatedFilters)
		},
	},
}
</script>

<style scoped lang="scss">
.filter-header {
	margin: 0.5rem 0;
}
.checkbox-container {
	display: flex;
	flex-wrap: wrap;
	.filter-option {
		width: auto;
		margin: 0 1rem 10px 0;

		label,
		input {
			vertical-align: middle;
		}

		label {
			display: inline-block;
			margin-left: 0.25rem;
			text-transform: capitalize;
			width: 4rem;

			@include user-select(none);
		}

		&.active label {
			font-weight: bold;
		}
	}
}

@media only screen and (max-width: 440px) {
	.checkbox-container {
		.filter-option {
			width: 50%;
			margin: 0 0 10px 0;
		}
	}
}
</style>
