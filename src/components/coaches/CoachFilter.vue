CoachFilter

<template>
	<base-card>
		<h2>Find Your Coach</h2>
		<span
			:class="['filter-option', { active: value.isActive }]"
			v-for="(value, key) in filters"
			:key="key"
		>
			<input type="checkbox" :id="key" checked @change="setFilter" />
			<label :for="key" class="sentenceCase">{{ key }}</label>
		</span>
	</base-card>
</template>

<script>
export default {
	emits: ['change-filter'],
	data() {
		return {
			filters: {
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
h2 {
	margin: 0.5rem 0;
}
.filter-option {
	margin-right: 1rem;

	label,
	input {
		vertical-align: middle;
	}

	label {
		margin-left: 0.25rem;
		text-transform: capitalize;
	}

	&.active label {
		font-weight: bold;
	}
}
</style>
