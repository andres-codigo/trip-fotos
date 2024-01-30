<template>
	<button v-if="!link" :class="mode" :disabled="disabled">
		<slot></slot>
	</button>
	<router-link v-else :to="to" :class="mode">
		<slot></slot>
	</router-link>
</template>

<script>
export default {
	props: {
		mode: {
			type: String,
			required: false,
			default: null,
		},
		link: {
			type: Boolean,
			required: false,
			default: false,
		},
		to: {
			type: String,
			required: false,
			default: '/',
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
}
</script>

<style scoped lang="scss">
button,
a {
	background-color: #3a0061;
	border: 1px solid #3a0061;
	border-radius: 30px;
	color: $color-white;
	cursor: pointer;
	display: inline-block;
	font: inherit;
	padding: 0.75rem 1.5rem;
	margin-right: 0.5rem;
	text-decoration: none;

	&:hover,
	&:active {
		background-color: #640c9f;
		border-color: #640c9f;
	}
}

.flat {
	background-color: transparent;
	color: #3a0061;
	border: none;

	&:hover,
	&:active {
		background-color: #edd2ff;
	}
}

.outline,
.disabled {
	border-color: #640c9f;
	color: #640c9f;
}
.outline {
	background-color: transparent;

	&:hover,
	&:active {
		background-color: #edd2ff;
	}
}
.disabled {
	background-color: #ccc;
	cursor: default;

	&:hover,
	&:active {
		background-color: #ccc;
	}
}
</style>
