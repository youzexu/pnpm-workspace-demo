<!-- 搜索组件 -->
<template>
  <div class="search-container">
    <!-- 搜索头部 -->
    <SearchHead 
    @update:searchList="searchList = $event" 
    @update:loading="loading = $event" 
    />
    <!-- 筛选部分 -->
    <Filter />
    <!-- 搜索结果部分 -->
    <Search :searchList="searchList" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 组件部分
import Search from './search-top/search-min.vue'
import Filter from './search-top/filter-section.vue'
import SearchHead from './search-top/search-head.vue'

interface FeedItem {
  id: number
  image: string
  title: string
  author: {
    id: number
    name: string
    avatar: string
  }
  likes: number
  collections: number
  growthRecords: number
  isLiked: boolean
}

const searchList = ref<FeedItem[]>([])

const loading = ref(false)
</script>

<style scoped>
.search-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 375px;
  height: 100%;
  background: white;
  z-index: 200;
  overflow-y: auto;
}
</style>
