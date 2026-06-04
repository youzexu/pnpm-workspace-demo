<!-- 搜索结果部分 -->
<template>
  <div class="search-results">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 空状态 -->
    <div v-else-if="searchList.length === 0" class="empty-state">
      <img src="@/icons/home/home-search/image.png" class="empty-image" />
      <p class="empty-title">这里空空的</p>
      <p class="empty-desc">换个关键词试试吧</p>
    </div>

    <!-- 瀑布流内容 -->
    <div v-else class="waterfall-container">
      <div class="waterfall-columns">
        <!-- 左列 -->
        <div class="waterfall-column">
          <div v-for="item in leftList" :key="item.id" class="waterfall-card">
            <div class="card-image" @click="goToPictureDetail(item)">
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
                  <span class="likes-count">{{ formatNumber(item.likes) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右列 -->
        <div class="waterfall-column">
          <div v-for="item in rightList" :key="item.id" class="waterfall-card">
            <div class="card-image" @click="goToPictureDetail(item)">
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
                  <span class="likes-count">{{ formatNumber(item.likes) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import notSelectedIcon from '@/icons/home/like1.png'
import likeIcon from '@/icons/home/like.png'
import { useNavigation } from '@/composables/useNavigation'

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

const props = defineProps<{
  loading: boolean
  searchList: FeedItem[]
}>()

// 分列数据
const leftList = ref<FeedItem[]>([])
const rightList = ref<FeedItem[]>([])
const { goToPictureDetail } = useNavigation()
// 格式化数字
const formatNumber = (num: number) => {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  return num.toString()
}

// 点赞/取消点赞
const toggleLike = (item: FeedItem) => {
  item.isLiked = !item.isLiked
  item.likes += item.isLiked ? 1 : -1
}
// 轮流分配数据到两列
const distributeToColumns = (items: FeedItem[]) => {
  const left: FeedItem[] = []
  const right: FeedItem[] = []

  items.forEach((item, index) => {
    if (index % 2 === 0) {
      left.push(item)
    } else {
      right.push(item)
    }
  })

  leftList.value = left
  rightList.value = right
}

// 监听数据变化，重新分配
watch(() => props.searchList, distributeToColumns, { immediate: true })
</script>

<style scoped>
/* 搜索结果容器 */
.search-results {
  background: #f5f5f5;
  min-height: 416px;
  position: relative;
}

/* ========== 加载状态 ========== */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
}

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
  color: #666;
}

/* ========== 空状态 ========== */
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
  font-size: 16px;
  color: #262e29;
  margin-bottom: 4px;
}

.empty-desc {
  font-size: 14px;
  color: rgba(44, 53, 47, 0.4);
}

/* ========== 瀑布流布局 ========== */
.waterfall-container {
  padding: clamp(6px, 2vw, 8px);
}

.waterfall-columns {
  display: flex;
  gap: clamp(6px, 2vw, 8px);
}

.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 2vw, 8px);
}

/* 瀑布流卡片 */
.waterfall-card {
  background: white;
  border-radius: clamp(6px, 2vw, 8px);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease;
  width: 100%;
}

.waterfall-card:active {
  transform: scale(0.98);
}

/* 图片区域 */
.card-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* 内容区域 */
.card-content {
  padding: clamp(8px, 3vw, 10px);
}

/* 标题 */
.card-title {
  font-size: clamp(12px, 3.5vw, 14px);
  font-weight: 600;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  color: #3d3d3d;
}

/* 底部信息 */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 作者信息 */
.author-info {
  display: flex;
  align-items: center;
  gap: 4px;
}

.author-avatar {
  width: clamp(16px, 4.5vw, 20px);
  height: clamp(16px, 4.5vw, 20px);
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-size: clamp(9px, 2.5vw, 10px);
  color: #666;
}

/* 点赞信息 */
.likes-info {
  display: flex;
  align-items: center;
  gap: 4px;
}

.likes-icon {
  width: clamp(14px, 4vw, 16px);
  height: clamp(14px, 4vw, 16px);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.likes-icon:active {
  transform: scale(1.2);
}

.likes-count {
  font-size: clamp(10px, 3vw, 12px);
  color: #999;
}

/* 小屏幕适配 */
@media (max-width: 350px) {
  .waterfall-columns {
    gap: 4px;
  }
  .waterfall-column {
    gap: 4px;
  }
  .waterfall-container {
    padding: 4px;
  }
}
</style>
