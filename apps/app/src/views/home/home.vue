<template>
  <div class="layout-wrapper">
    <!-- 顶部导航栏 -->
    <Navigation class="navigationBar" />

    <!-- 滚动容器 -->
    <div class="scroll-container">
      <!-- 筛选框区域 -->
      <template v-if="showTopBarComponent">
        <TopBar />
        <div class="filter-wrapper">
          <Filter />
        </div>
      </template>
      <!-- 主内容区域 -->
      <router-view v-slot="{ Component }">
        <keep-alive :include="['Recommend']">
          <component :is="Component" class="router-view" />
        </keep-alive>
      </router-view>
    </div>

    <!-- 底部栏 -->
    <Bottom class="footerNavigationBar" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// 导入组件
import Filter from '@/views/home/components/filter-bar/filter-box.vue'
import Navigation from './components/top-bar/navigation.vue'
import Bottom from '@/layout/bottom-bar.vue'
import TopBar from './components/top-two/top-bar.vue'

const route = useRoute()

// 是否显示顶部栏组件
const showTopBarComponent = computed(() => {
  return (
    route.path === '/home' ||
    (route.path.startsWith('/home/') &&
      !route.path.includes('/follow') &&
      !route.path.includes('/topic'))
  )
})
</script>

<style scoped>
/* 整体容器 */
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  background: white;
  overflow: hidden;
}

/* 顶部导航栏 */
.navigationBar {
  flex-shrink: 0;
  width: 100%;
  background: white;
  z-index: 100;
}

/* 滚动容器 */
.scroll-container {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  min-height: 0;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

/* 底部导航栏 */
.footerNavigationBar {
  flex-shrink: 0;
  width: 100%;
  background: white;
  z-index: 100;
}

/* 筛选框吸顶效果 */
.filter-wrapper {
  position: sticky;
  top: -3px;
  z-index: 98;
  background: white;
}

/* 路由内容区域 */
.router-view {
  padding: 8px;
  display: block;
}
</style>