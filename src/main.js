import { inject } from '@vercel/analytics'

import { createApp, defineAsyncComponent } from 'vue'
import { VueFire } from 'vuefire'

import { firebaseApp } from './firebase.js'
import router from './router.js'
import store from './store/index.js'
import App from './App.vue'
import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseBadge from './components/ui/BaseBadge.vue'
import BaseImage from './components/ui/BaseImage.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'

const BaseDialog = defineAsyncComponent(() =>
	import('./components/ui/BaseDialog.vue')
)

const app = createApp(App)

app.use(VueFire, {
	firebaseApp,
})
app.use(router)
app.use(store)

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-badge', BaseBadge)
app.component('base-image', BaseImage)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)

app.mount('#app')

inject()
