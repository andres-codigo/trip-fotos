<template>
	<span class="badge" :class="type">
		{{ text }}
	</span>
</template>

<script>
export default {
	props: ['type', 'title'],
	computed: {
		text() {
			return this.title.toUpperCase()
		},
	},
}
</script>

<style scoped lang="scss">
.badge {
	background-color: #ccc;
	border-radius: 30px;
	color: #252525;
	display: inline-block;
	margin-right: 0.5rem;
	padding: 0.5rem 1.5rem;
	@include user-select(none);

	&.frontend,
	&.backend,
	&.career {
		color: $color-white;
	}

	&.frontend {
		background-color: #3d008d;
	}

	&.backend {
		background-color: #71008d;
	}

	&.career {
		background-color: #8d006e;
	}
}
</style>
