<!-- 搜索结果部分 -->
<template>
  <div class="search-results">
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>
    <div v-else-if="searchList.length === 0 && !loading" class="empty-state">
      <img src="@/icons/home/home-search/image.png" class="empty-image" />
      <div class="empty-text">
        <p class="empty-title">这里空空的</p>
        <p class="empty-desc">换个关键词试试吧</p>
      </div>
    </div>
    <div v-else class="waterfall-container">
      <div v-for="item in searchList" :key="item.id" class="waterfall-card">
        <div class="card-image">
          <img :src="item.image" :alt="item.title" loading="lazy" />
        </div>
        <div class="card-content">
          <h3 class="card-title">{{ item.title }}</h3>
          <div class="card-footer">
            <div class="author-info">
              <img class="author-avatar" :src="item.author.avatar" />
              <span class="author-name">{{ item.author.name }}</span>
            </div>
            <div class="likes-info">
              <img
                class="likes-icon"
                :src="item.isLiked ? likeIcon : notSelectedIcon"
                @click="toggleLike(item)"
              />
              <span class="fontSize">{{ formatNumber(item.likes) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import notSelectedIcon from '@/icons/home/like1.png'
import likeIcon from '@/icons/home/like.png'

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
// 接受父组件数据
defineProps<{
  loading: boolean
  searchList: FeedItem[]
}>()
// 格式化数字
const formatNumber = (num: number) => {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  return num.toString()
}
// 点赞/取消点赞
const toggleLike = (item: FeedItem) => {
  if (item.isLiked) {
    item.isLiked = false
    item.likes--
  } else {
    item.isLiked = true
    item.likes++
  }
}
</script>

<style scoped>
/* 搜索结果 - 瀑布流 */
.search-results {
  background: #f5f5f5;
  padding-bottom: 20px;
  position: relative;
  min-height: 403px;
}

.waterfall-container {
  column-count: 2;
  column-gap: 7px;
  padding: 8px;
}

.waterfall-card {
  break-inside: avoid;
  margin-bottom: 8px;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.card-image img {
  width: 100%;
  height: auto;
  display: block;
}

.card-content {
  padding: 10px;
  padding-top: 4px;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 22px;
  color: #3d3d3d;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 4px;
}

.author-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.author-name {
  font-size: 10px;
  color: #666;
}

.likes-info {
  display: flex;
  align-items: center;
  gap: 4px;
}

.likes-icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.likes-icon:active {
  transform: scale(1.2);
}

.fontSize {
  font-size: 12px;
  color: #999;
}

/* 空状态样式 */
.empty-state {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 119px;
  text-align: center;
}

.empty-image {
  width: 100px;
  height: 100px;
  margin: 0 auto 24px;
  display: block;
}

.empty-title {
  font-family: PingFang SC;
  font-size: 16px;
  font-weight: normal;
  line-height: 26px;
  text-align: center;
  color: #262e29;
  margin-bottom: 4px;
}

.empty-desc {
  font-family: PingFang SC;
  font-size: 14px;
  font-weight: normal;
  line-height: 22px;
  text-align: center;
  color: rgba(44, 53, 47, 0.4);
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
}

/* 加载动画 */
.loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #f0f0f0;
  border-top-color: #37d081;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  font-size: 16px;
  font-weight: 500;
  font-family: PingFang SC;
  color: #666;
}
</style>
