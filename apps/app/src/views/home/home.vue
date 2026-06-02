<template>
  <div>
    <!-- 顶部导航栏 -->
    <Navigation />
    <!-- 滚动容器 -->
    <div class="scroll-container">
      <!-- 筛选框 -->
      <TopBar v-if="showTopBarComponent" />
      <!-- 筛选框2 -->
      <div class="filter-wrapper" v-if="showTopBarComponent">
        <Filter />
      </div>
      <!-- 主内容区域 -->
      <router-view />
    </div>
    <!-- 底部栏 -->
    <Bottom />
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
.navigationBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 375px;
  z-index: 100;
  background: white;
}

.footerNavigationBar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 375px;
  z-index: 100;
  background: white;
}

.scroll-container {
  position: fixed;
  top: 50px;
  bottom: 48px;
  left: 0;
  width: 375px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
   scrollbar-width: none;
  -ms-overflow-style: none;
}

.filter-wrapper {
  position: sticky;
  top: 0;
  z-index: 98;
  background: white;
}

router-view {
  padding: 8px;
}
</style>