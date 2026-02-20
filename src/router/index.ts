import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/search-results',
    name: 'search-results',
    component: () => import('@/views/SearchResults.vue'),
  },
  {
    path: '/shows/:id',
    name: 'show-details',
    component: () => import('@/views/ShowDetails.vue'),
    // props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
