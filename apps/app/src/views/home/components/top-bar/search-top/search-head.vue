<!-- 搜索头部 -->
<template>
  <div class="search-header">
    <img class="search-back" @click="$router.back()" src="@/icons/home/home-search/search.png" />
    <div class="search-input-wrapper">
      <img class="input-icon" src="@/icons/home/home-search/search1.png" />
      <input
        type="text"
        placeholder="搜索点啥呢..."
        v-model="keyword"
        @keyup.enter="handleSearch"
      />
    </div>
    <span class="search-text" @click="handleSearch">搜索</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { searchMockData } from '@/utils/mockData'

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

// 给父组件传递数据
const emit = defineEmits<{
  (e: 'update:searchList', list: FeedItem[]): void
  (e: 'update:loading', loading: boolean): void
}>()
const keyword = ref('')
// 搜索
const handleSearch = async () => {
  if (!keyword.value.trim()) {
    emit('update:searchList', [])
    return
  }

  emit('update:loading', true)
  try {
    const res = await searchMockData(keyword.value, 1, 20)
    if (res.code === 200) {
      emit('update:searchList', res.data.list)
    }
  } finally {
    emit('update:loading', false)
  }
}
</script>

<style scoped>
/* 搜索头部 */
.search-header {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 50px;
  background: white;
  padding: 0 16px;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 10;
}

.search-back {
  width: 24px;
  height: 24px;
  cursor: pointer;
  flex-shrink: 0;
}

.search-input-wrapper {
  flex: 1;
  position: relative;
}

.input-icon {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  z-index: 1;
  pointer-events: none;
}

.search-input-wrapper input {
  width: 100%;
  height: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  background: #f5f5f5;
  padding: 0 12px;
  padding-left: 32px;
  box-sizing: border-box;
}

.search-input-wrapper input:focus {
  border-color: #37d081;
}

.search-text {
  font-size: 14px;
  color: #37d081;
  cursor: pointer;
  flex-shrink: 0;
}
</style>
