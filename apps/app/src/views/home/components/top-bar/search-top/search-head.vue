<!-- 搜索头部 -->
<template>
  <div class="search-header">
    <img
      class="search-back"
      @click="$router.push('/home')"
      src="@/icons/home/home-search/search.png"
    />
    <div class="search-input-wrapper">
      <img class="input-icon" src="@/icons/home/home-search/search1.png" />
      <input
        type="text"
        placeholder="搜索点啥呢..."
        v-model="keyword"
        @keyup.enter="handleSearch"
      />
      <span class="search-division"></span>
      <span class="search-text" @click="handleSearch">搜索</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { searchMockData } from '@/utils/mockData'

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

// 事件定义
const emit = defineEmits<{
  (e: 'update:searchList', list: FeedItem[]): void
  (e: 'update:loading', loading: boolean): void
  (e: 'update:keyword', keyword: string): void
}>()

const keyword = ref('')

// 搜索处理
const handleSearch = async () => {
  if (!keyword.value.trim()) {
    emit('update:searchList', [])
    emit('update:keyword', '')
    return
  }

  emit('update:keyword', keyword.value)
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
/* 搜索头部容器 */
.search-header {
  width: 100%;
  max-width: 500px;
  min-height: 50px;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 clamp(12px, 4vw, 16px);
  position: sticky;
  top: 0;
  z-index: 10;
  margin: 0 auto;
}

/* 返回按钮 */
.search-back {
  width: clamp(20px, 6vw, 24px);
  height: clamp(20px, 6vw, 24px);
  cursor: pointer;
  flex-shrink: 0;
  margin-right: clamp(8px, 3vw, 12px);
}

/* 搜索输入框容器 */
.search-input-wrapper {
  position: relative;
  width: min(267px, 70vw);
  flex-shrink: 0;
}

/* 搜索图标 */
.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  pointer-events: none;
}

/* 输入框 */
.search-input-wrapper input {
  width: 100%;
  height: clamp(30px, 8vh, 32px);
  border: none;
  border-radius: 17px;
  background: #f5f5f5;
  outline: none;
  font-size: clamp(12px, 3.5vw, 14px);
  padding: 0 12px;
  padding-left: 36px;
  padding-right: 70px;
  box-sizing: border-box;
}

/* 分隔线 */
.search-division {
  position: absolute;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 12px;
  background: rgba(44, 53, 47, 0.4);
}

/* 搜索按钮 */
.search-text {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 600;
  color: #262e29;
  cursor: pointer;
}

/* 小屏幕适配 */
@media (max-width: 375px) {
  .search-header {
    max-width: 100%;
  }
}

/* 横屏适配 */
@media (orientation: landscape) and (max-height: 500px) {
  .search-header {
    min-height: 44px;
  }
  .search-input-wrapper input {
    height: 32px;
  }
}
</style>
