<template>
	<header class="header">
		<nav class="navbar">
			<h1 class="nav-logo">
				<router-link to="/">Find a Coach</router-link>
			</h1>
			<ul class="nav-menu" v-show="open" v-click-outside="closeDropdown">
				<li class="nav-item">
					<ul>
						<li v-if="isLoggedIn && isCoach">
							<router-link to="/requests" :custom="true" v-slot="{ href }">
								<a
									:href="href"
									class="nav-link"
									@click="this.toggleHamburgerMenuActiveClass()"
								>
									Requests<span
										class="requests-counter-container"
										v-if="!!totalRequests && totalRequests > 0"
										><span class="counter">{{ totalRequests }}</span></span
									>
								</a>
							</router-link>
							<!-- <router-link to="/requests" class="nav-link"
								>Requests
								<span
									class="requests-counter-container"
									v-if="!!this.totalRequests && this.totalRequests > 0"
									><span class="counter">{{ this.totalRequests }}</span></span
								>
							</router-link> -->
						</li>
						<li>
							<router-link to="/coaches" :custom="true" v-slot="{ href }">
								<a
									:href="href"
									class="nav-link"
									@click="this.toggleHamburgerMenuActiveClass()"
								>
									All Coaches
								</a>
							</router-link>
						</li>
					</ul>
				</li>
				<li v-if="!isLoggedIn" class="nav-item">
					<router-link to="/auth" :custom="true" v-slot="{ href }">
						<a
							:href="href"
							class="nav-link"
							@click="this.toggleHamburgerMenuActiveClass()"
						>
							Login
						</a>
					</router-link>
				</li>
				<li v-else class="nav-item">
					<base-button @click="logout">Logout {{ coachName }}</base-button>
				</li>
			</ul>
			<div class="hamburger">
				<span class="bar"></span>
				<span class="bar"></span>
				<span class="bar"></span>
			</div>
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
	mounted() {
		this.navBarMenu()
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
		toggleHamburgerMenuActiveClass() {
			console.log('toggleHamburgerMenuActiveClass')
			const hamburger = document.querySelector('.hamburger')
			const navMenu = document.querySelector('.nav-menu')

			hamburger.classList.toggle('active')
			navMenu.classList.toggle('active')
		},
		navBarMenu() {
			const hamburger = document.querySelector('.hamburger')
			const navMenu = document.querySelector('.nav-menu')

			hamburger.addEventListener('click', mobileMenu)

			function mobileMenu() {
				hamburger.classList.toggle('active')
				navMenu.classList.toggle('active')
			}
		},
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
		async logout() {
			this.coachName = ''
			this.totalRequests = null
			this.toggleHamburgerMenuActiveClass()
			await this.$store.dispatch('logout')
			await this.$router.replace('/coaches')
		},
	},
}
</script>

<script setup>
import { ref } from 'vue'

// State to toggle dropdown visibility
const open = ref(true)

// Method to close the dropdown
const closeDropdown = (event) => {
	const eventClassList = event.target.classList

	if (!eventClassList.contains('backdrop')) {
		const eventParentClassList = event.target.parentElement.classList

		const containsHamburgerClass = eventClassList.contains('hamburger')
		const containsBarClass = eventClassList.contains('bar')
		const parentContainsHamburgerClass =
			eventParentClassList.contains('hamburger')

		if (eventClassList !== null) {
			if (
				(containsBarClass && parentContainsHamburgerClass) ||
				containsHamburgerClass
			) {
				open.value = true
			}

			if (!containsHamburgerClass) {
				if (!containsBarClass && !parentContainsHamburgerClass) {
					const hamburger = document.querySelector('.hamburger')
					const navMenu = document.querySelector('.nav-menu')

					if (
						hamburger.classList.contains('active') &&
						navMenu.classList.contains('active')
					) {
						hamburger.classList.toggle('active')
						navMenu.classList.toggle('active')
						open.value = false
					}
				}
			}
		}
	}
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

	.navbar {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin: auto;
		width: 90%;

		h1 {
			margin: 0;

			a {
				color: $color-white;
				margin: 0;
				text-decoration: none;
			}
		}

		.nav-menu {
			align-items: center;
			display: flex;
			list-style: none;
			justify-content: space-between;
			margin: 0;
			padding: 0;

			.nav-item {
				margin: 0 0.5rem;

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

		.hamburger {
			display: none;
		}

		.bar {
			background-color: $color-white;
			display: block;
			height: 3px;
			margin: 5px auto;
			width: 25px;
			-webkit-transition: all 0.3s ease-in-out;
			transition: all 0.3s ease-in-out;
		}
	}
}

@media only screen and (max-width: 768px) {
	header {
		.navbar {
			.nav-menu {
				position: absolute;
				left: -100%;
				top: 5rem;
				flex-direction: column;
				background-color: $color-pigment-indigo;
				width: 100%;
				text-align: center;
				box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);

				&.active {
					left: 0;
				}

				.nav-item {
					width: 100%;
					a {
						margin: 0.75rem 0;
						&.router-link-active {
							border: none;
							width: 100%;
							&:hover {
								border: none;
							}
						}
					}
					button {
						background-color: $color-pigment-indigo;
						border: 1px solid $color-pigment-indigo;
						margin: 0.75rem 0;
					}
					.nav-link {
						width: 100%;
					}
					ul {
						display: block;
						padding-inline-start: 0;
						li {
							.router-link-active {
								border: none;
								width: 100%;
								&:hover {
									border: none;
								}
							}
						}
					}
				}
			}

			.hamburger {
				display: block;
				cursor: pointer;

				&.active .bar:nth-child(2) {
					opacity: 0;
				}

				&.active .bar:nth-child(1) {
					transform: translateY(8px) rotate(45deg);
				}

				&.active .bar:nth-child(3) {
					transform: translateY(-8px) rotate(-45deg);
				}
			}
		}
	}
}
</style>
