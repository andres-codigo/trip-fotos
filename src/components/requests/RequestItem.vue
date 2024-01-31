<template>
	<li>
		<div>
			<a :href="emailLink">{{ email }}</a>
		</div>
		<p>{{ message }}</p>
	</li>
</template>

<script>
export default {
	props: ['email', 'message'],
	computed: {
		emailLink() {
			return 'mailto:' + this.email
		},
	},
}
</script>

<style scoped lang="scss">
li {
	margin: 1rem 0;
	border: 1px solid $color-silver;
	padding: 1rem;

	a {
		color: $color-pigment-indigo;
		text-decoration: none;
		font-weight: bold;

		&:hover,
		&:active {
			color: $color-fresh-eggplant;
		}
	}

	p {
		margin: 0.5rem 0 0 0;
	}
}
</style>
