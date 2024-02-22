<template>
	<header>
		<nav>
			<h1>
				<router-link to="/">Find a Coach</router-link>
			</h1>
			<ul>
				<li>
					<ul>
						<li v-if="isLoggedIn && isCoach">
							<router-link to="/requests"
								>Requests
								<span
									class="requests-counter-container"
									v-if="!!this.totalRequests && this.totalRequests > 0"
									><span class="counter">{{ this.totalRequests }}</span></span
								>
							</router-link>
						</li>
						<li>
							<router-link to="/coaches">All Coaches</router-link>
						</li>
					</ul>
				</li>
				<li v-if="!isLoggedIn">
					<router-link to="/auth">Login</router-link>
				</li>
				<li v-else>
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
			totalRequests: null,
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated
		},
		usersName() {
			return this.$store.getters['coaches/coachName']
		},
		isCoach() {
			return this.$store.getters['coaches/isCoach']
		},
		requestsCount() {
			return this.$store.getters['requests/requestsCount']
		},
	},
	watch: {
		usersName(name) {
			this.coachName = name
		},
		requestsCount(count) {
			this.totalRequests = count
		},
	},
	created() {
		if (this.isLoggedIn) {
			this.setCoachName()
			this.setRequestCount()
		}
	},
	beforeUpdate() {
		if (this.isLoggedIn) {
			this.setCoachName()
			if (this.totalRequests === null) {
				this.setRequestCount()
			}
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
		setRequestCount() {
			this.$store.dispatch('requests/loadRequests').then(() => {
				this.totalRequests = this.requestsCount
			})
		},
		logout() {
			this.coachName = ''
			this.totalRequests = null

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
					position: relative;
					text-decoration: none;

					.requests-counter-container {
						--size: 1.4rem;
						--font-size: 0.75rem;
						appearance: none;
						border: 1px solid $color-lavender-magenta;
						border-radius: var(--size);
						color: inherit;
						cursor: pointer;
						height: var(--size);
						line-height: var(--size);
						padding: 0;
						position: absolute;
						right: 0.1rem;
						top: 0rem;
						width: var(--size);

						@include fadeIn(ease, 2s, 1, forwards);

						.counter {
							bottom: 1px;
							display: inline-block;
							font-size: var(--font-size);
							position: relative;
							text-align: center;
							width: 100%;
						}
					}

					&:hover {
						color: $color-white;
						.requests-counter-container {
							border: 1px solid $color-white;
						}
					}

					&.router-link-active {
						border: 1px solid $color-white;
						color: $color-white;

						.requests-counter-container {
							border: 1px solid $color-pigment-indigo;
						}
						&:hover {
							border: 1px solid $color-lavender-magenta;
							color: $color-lavender-magenta;

							.requests-counter-container {
								border: 1px solid $color-pigment-indigo;
							}
						}
					}
				}
			}
		}
	}
}
</style>
