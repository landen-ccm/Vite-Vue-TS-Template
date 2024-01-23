import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-light-green/theme.css'
import BaseCard from './components/pokemon/BaseCard.vue'

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.use(ToastService);

app.component('base-card', BaseCard)

app.mount('#app')
