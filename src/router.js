import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/pingisportalen',
      component: Home,
    },
    {
      path: '/pingisportalen/swedentour',
      component: () => import('@/views/SwedenTour.vue'),
    },
    {
      path: '/pingisportalen/links',
      component: () => import('@/views/Links.vue'),
    },
    {
      path: '/pingisportalen/about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: "/:catchAll(.*)",
      component: Home,
    }
  ],
})
