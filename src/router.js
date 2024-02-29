import { createRouter, createWebHistory } from 'vue-router'

import NotFound from './pages/NotFound.vue'

import store from './store/index.js'

const TripsList = () => import('./pages/trips/TripsList.vue')

const TravellerDetail = () => import('./pages/trips/TravellerDetail.vue')

const TravellerRegistration = () =>
	import('./pages/trips/TravellerRegistration.vue')

const ContactTraveller = () => import('./pages/requests/ContactTraveller.vue')

const RequestsReceived = () => import('./pages/requests/RequestsReceived.vue')

const UserAuth = () => import('./pages/auth/UserAuth.vue')

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/trips' },
		{ path: '/trips', component: TripsList },
		{
			path: '/trips/:id',
			component: TravellerDetail,
			props: true,
			children: [
				{
					path: 'contact',
					name: 'contact-traveller',
					component: ContactTraveller,
				}, // /trips/c1/contact
			],
		},
		{
			path: '/register',
			component: TravellerRegistration,
			meta: { requiresAuth: true },
		},
		{
			path: '/requests',
			component: RequestsReceived,
			meta: { requiresAuth: true },
		},
		{ path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
		{ path: '/:notFound(.*)', component: NotFound }, // catch all/invalid url
	],
})

// Global Navigation Guard
router.beforeEach(function (to, _, next) {
	if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
		next('/auth')
	} else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
		next('/trips')
	} else {
		next()
	}
})

export default router
