import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'primevue/resources/themes/md-light-indigo/theme.css'
import ToastService from 'primevue/toastservice'

import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(ToastService)
app.use(router)
app.use(PrimeVue)

app.mount('#app')
