import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-green/theme.css'

import Tooltip from 'primevue/tooltip'

import BaseCard from './components/BaseCard.vue'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.use(router)
app.component('base-card', BaseCard)
app.directive('tooltip', Tooltip)

app.mount('#app')
