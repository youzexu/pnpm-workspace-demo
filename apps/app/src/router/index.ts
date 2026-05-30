import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/home/home.vue')
    }
  ]
})

export default router
