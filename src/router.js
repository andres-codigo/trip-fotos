import { createRouter, createWebHistory } from 'vue-router'

// Coaches
import CoachesList from './pages/coaches/CoachesList.vue'

// Misc
import NotFound from './pages/NotFound.vue'

// Auth

import store from './store/index.js'

const CoachDetail = () => import('./pages/coaches/CoachDetail.vue')

const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue')

const ContactCoach = () => import('./pages/requests/ContactCoach.vue')

const RequestsReceived = () => import('./pages/requests/RequestsReceived.vue')

const UserAuth = () => import('./pages/auth/UserAuth.vue')

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/coaches' },
		{ path: '/coaches', component: CoachesList },
		{
			path: '/coaches/:id',
			component: CoachDetail,
			props: true,
			children: [
				{ path: 'contact', component: ContactCoach }, // /coaches/c1/contact
			],
		},
		{
			path: '/register',
			component: CoachRegistration,
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
		next('/coaches')
	} else {
		next()
	}
})

export default router
