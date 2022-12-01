import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/swedentour',
      component: () => import('@/views/SwedenTour.vue'),
    },
    {
      path: '/links',
      component: () => import('@/views/Links.vue'),
    },
    {
      path: '/news',
      component: () => import('@/views/News.vue'),
    },
    {
      path: '/about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: "/:catchAll(.*)",
      component: Home,
    }
  ],
})
