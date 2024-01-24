
// @ts-ignore
import { createWebHistory, createRouter } from "vue-router";
import index from '@/pages/index.vue'
import favoritesPage from '@/pages/favoritesPage.vue'
import details from '@/pages/details.vue'


const routes = [
  {path: '/', component: index},
  {path: '/favoritesPage', component: favoritesPage},
  {path: '/details',name:'details', component: details, props: (route: any) => ({ query: route.query.id })}
]


export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})