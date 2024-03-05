<template>
	<header class="header">
		<nav class="navbar">
			<h1 class="nav-logo">
				<router-link to="/">Trip Fotos</router-link>
			</h1>
			<ul v-show="open" v-click-outside="closeDropdown" class="nav-menu">
				<li class="nav-item">
					<ul>
						<li
							v-if="isLoggedIn && isTraveller"
							@click.prevent="toggleHamburgerMenuActiveClass()"
						>
							<router-link to="/messages" class="nav-link"
								>Messages
								<span
									v-if="!!totalMessages && totalMessages > 0"
									class="messages-counter-container"
									><span class="counter">{{
										totalMessages
									}}</span></span
								>
							</router-link>
						</li>
						<li @click.prevent="toggleHamburgerMenuActiveClass()">
							<router-link to="/trips" class="nav-link"
								>All Travellers</router-link
							>
						</li>
					</ul>
				</li>
				<li
					v-if="!isLoggedIn"
					class="nav-item"
					@click.prevent="toggleHamburgerMenuActiveClass()"
				>
					<router-link to="/auth" class="nav-link">Login</router-link>
				</li>
				<li v-else class="nav-item">
					<base-button @click="logout"
						>Logout {{ travellerName }}</base-button
					>
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
			travellerName: '',
			totalMessages: null,
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated
		},
		usersName() {
			return this.$store.getters['travellers/travellerName']
		},
		isTraveller() {
			return this.$store.getters['travellers/isTraveller']
		},
		messagesCount() {
			return this.$store.getters['messages/messagesCount']
		},
	},
	watch: {
		usersName(name) {
			this.travellerName = name
		},
		messagesCount(count) {
			this.totalMessages = count
		},
	},
	created() {
		if (this.isLoggedIn) {
			this.setTravellerName()
			this.setMessageCount()
		}
	},
	mounted() {
		this.navBarMenu()
	},
	beforeUpdate() {
		if (this.isLoggedIn) {
			this.setTravellerName()
			if (this.totalMessages === null) {
				this.setMessageCount()
			}
		}
	},
	methods: {
		toggleHamburgerMenuActiveClass() {
			if (document.documentElement.clientWidth <= 768) {
				const hamburger = document.querySelector('.hamburger')
				const navMenu = document.querySelector('.nav-menu')

				hamburger.classList.toggle('active')
				navMenu.classList.toggle('active')
			}
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
		setTravellerName() {
			let localStorageTravellerName = localStorage.getItem('userName')

			if (
				localStorageTravellerName &&
				localStorageTravellerName.length > 0
			) {
				this.travellerName = localStorageTravellerName

				this.$watch(
					() => localStorage.getItem('userName'),
					(newValue) => {
						this.travellerName = newValue
					}
				)
			}
		},
		setMessageCount() {
			this.$store.dispatch('messages/loadMessages').then(() => {
				this.totalMessages = this.messagesCount
			})
		},
		async logout() {
			this.travellerName = ''
			this.totalMessages = null
			this.toggleHamburgerMenuActiveClass()
			await this.$store.dispatch('logout')
			await this.$router.replace('/trips')
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
	if (document.documentElement.clientWidth <= 768) {
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
					color: $color-white;
					display: inline-block;
					padding: 0.75rem 1.5rem;
					position: relative;
					text-decoration: none;

					.messages-counter-container {
						--size: 1.4rem;
						--font-size: 0.75rem;
						appearance: none;
						border: 1px solid $color-pigment-indigo;
						color: inherit;
						cursor: pointer;
						height: var(--size);
						line-height: var(--size);
						padding: 0;
						position: absolute;
						top: 0rem;
						width: var(--size);

						@include fadeIn(ease, 2s, 1, forwards);

						.counter {
							display: inline-block;
							font-size: var(--font-size);
							position: relative;
							text-align: center;
							width: 100%;
						}
					}

					&:hover {
						color: $color-lavender-magenta;
						.messages-counter-container {
							border: 1px solid $color-pigment-indigo;
						}
					}

					&.router-link-active {
						border: 1px solid $color-white;
						color: $color-white;

						.messages-counter-container {
							border: 1px solid $color-pigment-indigo;
						}
						&:hover {
							border: 1px solid $color-lavender-magenta;
							color: $color-lavender-magenta;

							.messages-counter-container {
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
				top: 4.9rem;
				flex-direction: column;
				background-color: $color-pigment-indigo;
				width: 100%;
				text-align: center;
				box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);

				&.active {
					left: 0;
					.nav-item {
						margin: 0;
						width: 100%;
						ul {
							display: block;
							padding-inline-start: 0;
							li {
								margin: 0;
								a {
									padding: 1.25rem 0;
									width: 100%;
									&.router-link-active {
										background-color: $color-ripe-eggplant;
										border: none;
										width: 100%;
										&:hover {
											border: none;
										}
									}
								}
							}
						}
						a {
							padding: 1.25rem 0;
							width: 100%;

							.messages-counter-container {
								--size: 2rem;
								--font-size: 1rem;
								appearance: none;
								border: none;
								border-radius: var(--size);

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

							&:active,
							&:hover {
								color: $color-lavender-magenta;
								.messages-counter-container {
									border: none;
								}
							}
							&.router-link-active {
								background-color: $color-ripe-eggplant;
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
							border-radius: 0;
							margin: 0;
							padding: 1.25rem 0;
							width: inherit;
							&:active,
							&:hover {
								color: $color-lavender-magenta;
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
