import { createStore } from 'vuex'

import travellersModule from './modules/travellers/index.js'
import messagesModule from './modules/messages/index.js'
import authModule from './modules/auth/index.js'

const store = createStore({
	modules: {
		travellers: travellersModule,
		messages: messagesModule,
		auth: authModule,
	},
})

export default store
