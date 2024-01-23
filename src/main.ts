import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-dark-pink/theme.css'


const app = createApp(App)
app.use(PrimeVue)

app.use(router)

app.mount('#app')