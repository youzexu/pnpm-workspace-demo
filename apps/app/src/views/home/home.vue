<template>
  <div>
    <!-- 顶部导航栏 -->
    <Navigation />
    <!-- 筛选框 -->
    <TopBar :class="{ hide: !showTopBar }" />
    <!-- 筛选框2 -->
    <Filter :class="{ hide: !showFilter }" />
    <!-- 主内容区域 -->
    <div class="content-wrapper" ref="contentRef" @scroll="handleScroll">
      <Content />
    </div>
    <!-- 底部栏 -->
    <Bottom />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 组件
import Filter from './components/filter-bar/filter-box.vue'
import Navigation from './components/top-bar/navigation.vue'
import Content from './components/content-area/main-content.vue'
import Bottom from '@/layout/bottom-bar.vue'
import TopBar from './components/top-two/top-bar.vue'

const showTopBar = ref(true)
const showFilter = ref(true)
const lastScrollTop = ref(0)
const contentRef = ref<HTMLElement | null>(null)

// 根据滚动位置调整顶部导航栏和筛选框的显示状态
const handleScroll = () => {
  if (!contentRef.value) return
  const scrollTop = contentRef.value.scrollTop
  const isScrollingDown = scrollTop > lastScrollTop.value
  if (isScrollingDown) {
    // 向下滑动
    if (scrollTop > 50) {
      showFilter.value = false
      showTopBar.value = false
    }
  } else {
    // 向上滑动
    if (scrollTop < 50) {
      showTopBar.value = true
      showFilter.value = true
    }
  }

  lastScrollTop.value = scrollTop
}
</script>

<style scoped>
.content-wrapper {
  height: calc(100vh - 48px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-top: 165px;
  box-sizing: border-box;
}
.content-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
