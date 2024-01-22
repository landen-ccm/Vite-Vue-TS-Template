import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'primevue/resources/themes/lara-light-green/theme.css'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
const app = createApp(App)

app.use(router)

app.use(PrimeVue)
app.directive('tooltip', Tooltip)

app.mount('#app')
