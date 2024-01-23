// @ts-ignore
import { createWebHistory, createRouter } from "vue-router";
import mainPage from '@/pages/main.vue'
import favorite from '@/components/Favorite.vue'
import detail from '@/components/Details.vue'


const routes = [
  {path: '/', component: mainPage},
  {path: '/:id', component: detail},
  {path: '/favorite', component: favorite}
]


export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})