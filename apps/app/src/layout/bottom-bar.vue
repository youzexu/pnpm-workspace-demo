<template>
  <!-- 底部导航栏 -->
  <div class="footerNavigationBar">
    <div v-for="(item, id) in navItems" :key="id" class="nav-item" @click="handleNavClick(item)">
      <div class="icon-wrapper">
        <img
          class="nav-icon"
          :class="{ 'publish-icon': item.isPublish }"
          :src="activeIndex === id ? item.activeIcon : item.icon"
        />
        <!-- 角标移-->
        <img v-if="item.id === 2" class="video-badge" :src="badgeIcon" />
      </div>
      <span class="nav-label" :class="{ active: activeIndex === id }">
        {{ item.label }}
      </span>
    </div>
    <!-- 发布按钮 -->
    <Publish :isOpen="isPublishOpen" @close="closePublish" />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import Publish from './publish.vue'
// 未选中图标
import homeIcon from '@/icons/home/home.png'
import knowledgeIcon from '@/icons/home/knowledge.png'
import publishIcon from '@/icons/home/publish.png'
import messageIcon from '@/icons/home/message.png'
import myIcon from '@/icons/home/my.png'

// 选中图标
import badgeIcon from '@/icons/home/badge.png'
import homeActiveIcon from '@/icons/home/home1.png'
import knowledgeActiveIcon from '@/icons/home/knowledge1.png'
import publishActiveIcon from '@/icons/home/publish.png'
import messageActiveIcon from '@/icons/home/message1.png'
import myActiveIcon from '@/icons/home/my1.png'

interface NaviBar {
  id: number
  label: string
  icon: string
  activeIcon: string
  isPublish: boolean
}

const isPublishOpen = ref(false)
const router = useRouter()
const route = useRoute()
// 底部导航栏数据
const navItems = [
  {
    id: 1,
    icon: homeIcon,
    activeIcon: homeActiveIcon,
    label: '首页',
    isPublish: false
  },
  {
    id: 2,
    icon: knowledgeIcon,
    activeIcon: knowledgeActiveIcon,
    label: '知识库',
    isPublish: false
  },
  {
    id: 3,
    icon: publishIcon,
    activeIcon: publishActiveIcon,
    label: '',
    isPublish: true
  },
  {
    id: 4,
    icon: messageIcon,
    activeIcon: messageActiveIcon,
    label: '消息',
    isPublish: false
  },
  {
    id: 5,
    icon: myIcon,
    activeIcon: myActiveIcon,
    label: '我的',
    isPublish: false
  }
]

// 计算当前选中的导航项索引
const activeIndex = computed(() => {
  const path = route.path
  if (path === '/home' || path.startsWith('/home')) return 0
  if (path === '/knowledge' || path.startsWith('/knowledge')) return 1
  if (path === '/message' || path.startsWith('/message')) return 3
  if (path === '/mine' || path.startsWith('/mine')) return 4
  return 0
})

const handleNavClick = (item: NaviBar) => {
  if (item.isPublish) {
    isPublishOpen.value = true
  } else {
    if (item.label === '首页') router.push('/home')
    else if (item.label === '知识库') router.push('/knowledge')
    else if (item.label === '消息') router.push('/message')
    else if (item.label === '我的') router.push('/mine')
  }
}

const closePublish = () => {
  isPublishOpen.value = false
}
</script>
<style scoped>
/* 底部导航栏样式*/
.footerNavigationBar {
  position: relative;
  width: 100%;
  height: 48px;
  background: #ffffff;
  box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.05);
  z-index: 100;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/* 导航项容器 */
.nav-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  height: 100%;
}

/* 图标容器 */
.icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 导航图标 */
.nav-icon {
  width: 24px;
  height: 24px;
}

/* 文字样式 */
.nav-label {
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  color: rgba(44, 53, 47, 0.4);
  transition: color 0.3s;
  margin-top: 2px;
}

/* 选中状态文字样式 */
.nav-label.active {
  color: #262e29;
}

/* 发布按钮样式 */
.nav-icon.publish-icon {
  width: 48px;
  height: 36px;
  border-radius: 4px;
  background: linear-gradient(53deg, #1f2622 0%, #314037 99%);
}

/* 角标 */
.video-badge {
  position: absolute;
  top: -6px;
  right: -12px;
  width: 20px;
  height: 11px;
  border-radius: 4px;
}

/* 响应式适配 */
@media (max-width: 375px) {
  .footerNavigationBar {
    max-width: 100%;
  }
}
</style>