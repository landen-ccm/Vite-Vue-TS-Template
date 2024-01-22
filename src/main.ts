import './assets/main.scss'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'
import 'primevue/resources/themes/lara-light-green/theme.css'

export const BASE_API_URL = 'https://pokeapi.co/api/v2/pokemon'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.mount('#app')
