import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'
import 'primevue/resources/themes/lara-light-green/theme.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.mount('#app')
