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
        // 发现路由
        {
          path: '',
          name: 'Discover',
          component: () => import('../views/home/components/top-bar/navigation-item/discover.vue'),
          children: [
            //内容路由
            {
              path: '',
              name: 'Recommend',
              component: () =>
                import('../views/home/components/filter-bar/filter-item/recommend.vue')
            },
            // 最新路由
            {
              path: 'latest',
              name: 'Latest',
              component: () => import('../views/home/components/filter-bar/filter-item/latest.vue')
            },
            // 热门路由
            {
              path: 'popular',
              name: 'Popular',
              component: () => import('../views/home/components/filter-bar/filter-item/popular.vue')
            },
            // 附近路由
            {
              path: 'nearby',
              name: 'Nearby',
              component: () => import('../views/home/components/filter-bar/filter-item/nearby.vue')
            },
            // 价格路由
            {
              path: 'price',
              name: 'Price',
              component: () => import('../views/home/components/filter-bar/filter-item/price.vue')
            },
            // 销售路由
            {
              path: 'sales',
              name: 'Sales',
              component: () => import('../views/home/components/filter-bar/filter-item/sales.vue')
            },
            // 评分路由
            {
              path: 'rating',
              name: 'Rating',
              component: () => import('../views/home/components/filter-bar/filter-item/rating.vue')
            },
            // 品牌路由
            {
              path: 'brand',
              name: 'Brand',
              component: () => import('../views/home/components/filter-bar/filter-item/brand.vue')
            }
          ]
        },
        // 关注路由
        {
          path: 'follow',
          name: 'Follow',
          component: () => import('../views/home/components/top-bar/navigation-item/follow.vue')
        },
        // 话题路由
        {
          path: 'topic',
          name: 'Topic',
          component: () => import('../views/home/components/top-bar/navigation-item/topic.vue')
        }
      ]
    },
    //搜索路由
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/home/components/top-bar/search.vue'),
      children: [
        // 藏品路由
        {
          path: 'collection',
          name: 'Collection',
          component: () =>
            import('../views/home/components/top-bar/search-top/filter-options/Filter-collection.vue')
        },
        // 用户路由
        {
          path: 'users',
          name: 'Users',
          component: () =>
            import('../views/home/components/top-bar/search-top/filter-options/filter-users.vue')
        }
      ]
    },
    // 草稿路由
    {
      path: '/drafts',
      name: 'Drafts',
      component: () => import('../views/home/components/top-bar/drawer-divider/drafts.vue')
    },
    // 设置路由
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/home/components/top-bar/drawer-divider/settings.vue')
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
    },
    //图片详细路由
    {
      path: '/picture/:id', // 添加 :id 动态参数
      name: 'Picture',
      component: () => import('../views/detail/picture-details.vue')
    }
  ]
})

export default router
