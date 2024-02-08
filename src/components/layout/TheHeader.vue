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
					<base-button @click="logout">Logout {{ coachName }}</base-button>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	data() {
		return {
			coachName: '',
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated
		},
		usersName() {
			return this.$store.getters['coaches/coachName']
		},
	},
	watch: {
		usersName(name) {
			this.coachName = name
		},
	},
	created() {
		if (this.isLoggedIn) {
			this.setCoachName()
		}
	},
	beforeUpdate() {
		if (this.isLoggedIn) {
			this.setCoachName()
		}
	},
	methods: {
		setCoachName() {
			let localStorageCoachName = localStorage.getItem('userName')

			if (localStorageCoachName && localStorageCoachName.length > 0) {
				this.coachName = localStorageCoachName

				this.$watch(
					() => localStorage.getItem('userName'),
					(newValue) => {
						this.coachName = newValue
					}
				)
			}
		},
		logout() {
			this.coachName = ''

			this.$store.dispatch('logout')
			this.$router.replace('/coaches')
		},
	},
}
</script>

<style scoped lang="scss">
header {
	align-items: center;
	background-color: $color-pigment-indigo;
	display: flex;
	height: 5rem;
	justify-content: center;
	width: 100%;

	nav {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin: auto;
		width: 90%;

		h1 {
			margin: 0;

			a {
				color: $color-white;
				text-decoration: none;
				margin: 0;

				&:hover,
				&:active,
				&.router-link-active {
					border-color: transparent;
				}
			}
		}

		ul {
			align-items: center;
			display: flex;
			justify-content: center;
			list-style: none;
			margin: 0;
			padding: 0;

			li {
				margin: 0 0.5rem;

				a {
					border: 1px solid transparent;
					color: $color-lavender-magenta;
					display: inline-block;
					padding: 0.75rem 1.5rem;
					text-decoration: none;

					&:hover {
						color: $color-white;
					}

					&.router-link-active {
						border: 1px solid $color-white;
						color: $color-white;
						&:hover {
							border: 1px solid $color-lavender-magenta;
							color: $color-lavender-magenta;
						}
					}
				}
			}
		}
	}
}
</style>
