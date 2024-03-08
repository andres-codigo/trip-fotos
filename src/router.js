import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store/index.js'

const TripsList = () => import('@/pages/trips/TripsList.vue')

const TravellerDetail = () => import('@/pages/trips/TravellerDetail.vue')

const TravellerRegistration = () =>
	import('@/pages/trips/TravellerRegistration.vue')

const ContactTraveller = () => import('@/pages/messages/ContactTraveller.vue')

const MessagesReceived = () => import('@/pages/messages/MessagesReceived.vue')

const UserAuth = () => import('@/pages/auth/UserAuth.vue')

const NotFound = () => import('@/pages/NotFound.vue')

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/trips', meta: { requiresAuth: true } },
		{
			path: '/trips',
			component: TripsList,
			meta: { requiresAuth: true },
		},
		{
			path: '/trips/:id',
			component: TravellerDetail,
			props: true,
			meta: { requiresAuth: true },
			children: [
				{
					path: 'contact',
					name: 'contact-traveller',
					component: ContactTraveller,
					meta: { requiresAuth: true },
				}, // /trips/c1/contact
			],
		},
		{
			path: '/register',
			component: TravellerRegistration,
			meta: { requiresAuth: true },
		},
		{
			path: '/messages',
			component: MessagesReceived,
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
