<template>
	<li>
		<div class="from">
			<h4>From</h4>
			<p>
				{{ name }}
			</p>
		</div>
		<div class="email">
			<h4>Email</h4>
			<p>
				<a :href="emailLink">{{ email }}</a>
			</p>
		</div>
		<div>
			<h4>Message:</h4>
			<p>{{ message }}</p>
		</div>
	</li>
</template>

<script>
export default {
	props: ['name', 'email', 'message'],
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

	.from,
	.email {
		margin-bottom: 0.75rem;
	}
	h4 {
		margin: 0.25rem 0;
	}

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
		margin: 0 0 0.25rem 0;
	}
}
</style>
