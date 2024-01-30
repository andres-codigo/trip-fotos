<template>
	<header>
		<nav>
			<h1>
				<router-link to="/">Find a Coach</router-link>
			</h1>
			<ul>
				<li>
					<router-link to="/coaches">All Coaches</router-link>
				</li>
				<li v-if="isLoggedIn">
					<router-link to="/requests">Requests</router-link>
				</li>
				<li v-else>
					<router-link to="/auth">Login</router-link>
				</li>
				<li v-if="isLoggedIn">
					<base-button @click="logout">Logout</base-button>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated
		},
	},
	methods: {
		logout() {
			this.$store.dispatch('logout')
			this.$router.replace('/coaches')
		},
	},
}
</script>

<style scoped lang="scss">
header {
	align-items: center;
	background-color: #3d008d;
	display: flex;
	height: 5rem;
	justify-content: center;
	width: 100%;

	a {
		border: 1px solid transparent;
		color: #f391e3;
		display: inline-block;
		padding: 0.75rem 1.5rem;
		text-decoration: none;

		&:hover {
			color: #fff;
		}
	}
}
a.router-link-active {
	border: 1px solid #fff;
	color: #fff;
	&:hover {
		border: 1px solid #f391e3;
		color: #f391e3;
	}
}

h1 {
	margin: 0;

	a {
		color: $color-white;
		margin: 0;

		&:hover,
		&:active,
		&.router-link-active {
			border-color: transparent;
		}
	}
}

header nav {
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin: auto;
	width: 90%;

	ul {
		align-items: center;
		display: flex;
		justify-content: center;
		list-style: none;
		margin: 0;
		padding: 0;

		li {
			margin: 0 0.5rem;
		}
	}
}
</style>
