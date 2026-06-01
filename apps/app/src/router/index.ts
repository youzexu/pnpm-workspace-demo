import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //登录路由
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/login/login.vue')
    },
    //首页路由
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/home/home.vue'),
      children: [
        //内容路由
        {
          path: '',
          name: 'Content',
          component: () => import('../views/home/components/content-area/main-content.vue')
        }
      ]
    },
    //搜索路由
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/home/components/top-bar/search.vue')
    },

    //知识库路由
    {
      path: '/knowledge',
      name: 'Knowledge',
      component: () => import('../views/knowledge-base/knowledge-base.vue')
    },
    //消息路由
    {
      path: '/message',
      name: 'Message',
      component: () => import('../views/message/message.vue')
    },
    //我的路由
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('../views/mine/mine.vue')
    }
  ]
})

export default router
