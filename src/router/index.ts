// @ts-ignore
import { createRouter, createWebHistory } from 'vue-router'
import DetailsPageVue from '../pages/DetailsPage.vue'
import FavoritesPageVue from '@/pages/FavoritesPage.vue'
import Index from '@/pages/index.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/favorites',
      name: 'favorites',
      component: () => FavoritesPageVue
    },
    {
      path: '/details',
      name: 'details',
      props: (route: any) => ({ query: route.query.id }),
      component: () => DetailsPageVue
    },
    {
      path: '/',
      name: 'home',
      component: () => Index
    }
  ]
})
