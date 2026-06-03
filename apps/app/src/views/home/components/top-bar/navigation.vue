<!-- 顶部导航栏 -->
<template>
  <div class="navigation-wrapper">
    <div class="navigationBar">
      <img class="sidepng" src="@/icons/home/side.png" @click="openDrawer" />
      <div class="navigationBarContent">
        <div
          v-for="(item, index) in tabs"
          :key="index"
          class="tab-item"
          :class="{ active: selected === index }"
          @click="handleTabClick(item.path, index)"
        >
          <div class="tab-text-wrapper">
            <div class="tab-text">{{ item.name }}</div>
            <img v-if="selected === index" class="tab-indicator" src="@/icons/home/leaf.png" />
          </div>
        </div>
      </div>
      <img class="discoverpng" src="@/icons/home/discover.png" @click="goToSearch" />
    </div>
    <!-- 侧边栏 -->
    <Drawer :isOpen="isDrawerOpen" @close="closeDrawer" />
  </div>
</template>

<script setup lang="ts">
import Drawer from './drawer.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// 路由实例
const router = useRouter()
// 侧边栏展开/收起状态
const isDrawerOpen = ref(false)
// 导航栏选项
const selected = ref(0)

// 导航栏选项数组
const tabs = [
  { name: '发现', path: '/home' },
  { name: '关注', path: '/home/follow' },
  { name: '话题', path: '/home/topic' }
]

// 点击 Tab 跳转
const handleTabClick = (path: string, index: number) => {
  selected.value = index
  router.push(path)
}

// 跳转到搜索页面
const goToSearch = () => {
  router.push('/search/collection')
}

// 打开侧边栏
const openDrawer = () => {
  isDrawerOpen.value = true
}

// 关闭侧边栏
const closeDrawer = () => {
  isDrawerOpen.value = false
}
</script>

<style scoped>
/* 导航栏容器 */
.navigation-wrapper {
  width: 100%;
}

/* 导航栏主体 */
.navigationBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 50px;
  background: white;
  padding: 0 clamp(12px, 4vw, 16px);
  box-sizing: border-box;
  z-index: 100;
  flex-shrink: 0;
}

/* 左右图标 */
.discoverpng,
.sidepng {
  width: clamp(20px, 6vw, 24px);
  height: clamp(20px, 6vw, 24px);
  cursor: pointer;
  flex-shrink: 0;
}

/* 中间导航选项容器 */
.navigationBarContent {
  display: flex;
  gap: clamp(16px, 6vw, 24px);
  flex: 1;
  justify-content: center;
}

/* 导航项 */
.tab-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
}

/* 导航文字容器 */
.tab-text-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 导航文字 */
.tab-text {
  font-size: clamp(14px, 4vw, 16px);
  font-weight: 600;
  color: rgba(44, 53, 47, 0.6);
  white-space: nowrap;
}

/* 激活状态 */
.tab-item.active .tab-text {
  color: #262e29;
}

/* 激活指示器 */
.tab-indicator {
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
  width: clamp(14px, 4vw, 18.8px);
  height: clamp(22px, 6vw, 28.71px);
  pointer-events: none;
}

/* 小屏幕适配 */
@media (max-width: 350px) {
  .navigationBarContent {
    gap: 12px;
  }
  .tab-text {
    font-size: 13px;
  }
}

@media (max-width: 320px) {
  .navigationBarContent {
    gap: 8px;
  }
  .tab-text {
    font-size: 12px;
  }
}
</style>