import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-light-green/theme.css'

import Button from "primevue/button"
const app = createApp(App)
app.component('Buttons', Button);
app.use(router)
app.use(PrimeVue)
app.mount('#app')
