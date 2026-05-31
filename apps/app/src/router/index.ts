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
      component: () => import('../views/home/home.vue'),
      children: [
        {
          path: 'search',
          name: 'Search',
          component: () => import('../views/home/components/search.vue')
        }
      ]
    }
  ]
})

export default router
