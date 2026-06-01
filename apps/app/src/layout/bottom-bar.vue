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
    <!-- 首页发布按钮 -->
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
    else if (item.label === '知识库') {
      router.push('/knowledge')
      console.log('知识库')
    } else if (item.label === '消息') router.push('/message')
    else if (item.label === '我的') router.push('/mine')
  }
}

const closePublish = () => {
  isPublishOpen.value = false
}
</script>
<style scoped>
/* 底部导航栏样式 */
.footerNavigationBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 375px;
  height: 48px;
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  z-index: 100;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.nav-item {
  /* 导航项容器  */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.nav-label {
  /* 文字样式 */
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  color: rgba(44, 53, 47, 0.4);
  transition: color 0.3s;
  margin-top: 2px;
}

.nav-label.active {
  /* 选中状态文字样式 */
  color: #262e29;
}
.nav-icon {
  width: 24px;
  height: 24px;
}
/* 发布按钮样式 */
.nav-icon.publish-icon {
  width: 48px;
  height: 36px;
  border-radius: 4px;
  background: linear-gradient(53deg, #1f2622 0%, #314037 99%);
}

.nav-icon.publish-icon.active {
  background: linear-gradient(53deg, #37d081 0%, #2db872 99%);
}
/* 图标容器 */
.icon-wrapper {
  position: relative;
  display: inline-block;
}
.video-badge {
  position: absolute;
  top: -3px;
  right: -12px;
  width: 20px;
  height: 11px;
  border-radius: 4px;
}
.nav-icon {
  width: 24px;
  height: 24px;
}
</style>
