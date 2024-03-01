import { createStore } from 'vuex'

import travellersModule from './modules/travellers/index.js'
import requestsModule from './modules/requests/index.js'
import authModule from './modules/auth/index.js'

const store = createStore({
	modules: {
		travellers: travellersModule,
		requests: requestsModule,
		auth: authModule,
	},
})

export default store
