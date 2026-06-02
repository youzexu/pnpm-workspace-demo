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
  (e: 'update:keyword', keyword: string): void // 新增：传递关键词
}>()
const keyword = ref('')
// 搜索
const handleSearch = async () => {
  if (!keyword.value.trim()) {
    emit('update:searchList', [])
    emit('update:keyword', '')
    return
  }
  // 传递关键词给父组件
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
.search-header {
  width: 375px;
  height: 50px;
  background: #ffffff;
  display: flex;
  align-items: center;
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
  margin-right: 12px;
}

.search-input-wrapper {
  flex: 1;
  position: relative;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.search-input-wrapper input {
  width: 100%;
  height: 34px;
  border: none;
  border-radius: 17px;
  background: #f5f5f5;
  outline: none;
  font-size: 14px;
  padding: 0 12px;
  padding-left: 36px;
  padding-right: 70px;
  box-sizing: border-box;
}

.search-division {
  position: absolute;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 12px;
  background: rgba(44, 53, 47, 0.4);
}

.search-text {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-family: PingFang SC;
  font-size: 12px;
  font-weight: 600;
  color: #262e29;
  cursor: pointer;
}
</style>
