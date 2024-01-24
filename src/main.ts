import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-dark-blue/theme.css'
import ToastService from 'primevue/toastservice'

import Tooltip from 'primevue/tooltip'

const app = createApp(App)
app.directive('tooltip', Tooltip)
app.use(PrimeVue)
app.use(ToastService)
app.use(router)

app.mount('#app')
