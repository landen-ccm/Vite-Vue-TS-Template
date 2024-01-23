import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-dark-pink/theme.css'
import {ref} from 'vue'

const pageNumber = ref(1)
const pageSize = ref('25')

const app = createApp(App)
app.provide('pageNumber', pageNumber)
app.provide('pageSize', pageSize)

app.use(PrimeVue)

app.use(router)

app.mount('#app')