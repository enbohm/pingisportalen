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
      path: '/pingisportalen/about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/pingisportalen/contact',
      component: () => import('@/views/Contact.vue'),
    },
    {
      path: "/:catchAll(.*)",
      component: Home,
    }
  ],
})
