<!-- 搜索组件 -->
<template>
  <div class="search-container">
    <!-- 搜索头部 -->
    <SearchHead
      @update:searchList="searchList = $event"
      @update:loading="loading = $event"
      @update:keyword="searchKeyword = $event"
    />
    <!-- 筛选部分 -->
    <Filter />
    <!-- 搜索结果部分 -->
    <router-view :searchList="searchList" :loading="loading" :searchKeyword="searchKeyword" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 组件导入
import Filter from './search-top/filter-section.vue'
import SearchHead from './search-top/search-head.vue'

// 数据类型定义
interface FeedItem {
  id: number
  image: string
  title: string
  author: { id: number; name: string; avatar: string }
  likes: number
  collections: number
  growthRecords: number
  isLiked: boolean
}

// 响应式数据
const searchList = ref<FeedItem[]>([])
const searchKeyword = ref('')
const loading = ref(false)
</script>

<style scoped>
/* 整体容器 */
.search-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  background: white;
  margin: 0 auto;
  overflow: hidden;
}

/* 搜索头部  */
.search-container > :first-child {
  flex-shrink: 0;
}

/* 筛选部分  */
.search-container > :nth-child(2) {
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
}

/* 搜索结果区域  */
.search-container > :last-child {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* 响应式适配 */
@media (max-width: 375px) {
  .search-container {
    max-width: 100%;
  }
}

@media (orientation: landscape) and (max-height: 500px) {
  .search-container {
    height: 100%;
  }
}
</style>