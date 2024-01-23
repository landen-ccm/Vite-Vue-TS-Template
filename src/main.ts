import './assets/main.scss'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'
import 'primevue/resources/themes/lara-light-green/theme.css'
import ToastService from 'primevue/toastservice';



const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService);

app.mount('#app')
