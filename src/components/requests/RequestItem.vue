<template>
	<li class="request">
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
}
</style>
