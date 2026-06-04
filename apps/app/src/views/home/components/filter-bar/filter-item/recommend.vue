<!-- 瀑布流组件 -->
<template>
  <div class="waterfall-container">
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

    <!-- 加载更多容器 -->
    <div class="load-more-container">
      <div v-if="loading" class="loading-more">加载中...</div>
      <div v-else-if="!hasMore && feedList.length > 0" class="no-more">没有更多了</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import notSelectedIcon from '@/icons/home/like1.png'
import likeIcon from '@/icons/home/like.png'
import { fetchMockData } from '@/utils/mockData'
import { useNavigation } from '@/composables/useNavigation'
// 定义 FeedItem 接口
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

const { goToPictureDetail } = useNavigation()
const feedList = ref<FeedItem[]>([])
const leftList = ref<FeedItem[]>([])
const rightList = ref<FeedItem[]>([])
const loading = ref(false)
const page = ref(1)
const hasMore = ref(true)
// 防止重复加载
let isLoadingMore = false

// 格式化数字
const formatNumber = (num: number) => {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
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

// 加载数据
const loadData = async () => {
  if (loading.value || !hasMore.value) return

  loading.value = true
  try {
    const res = await fetchMockData(page.value, 10)
    if (res.code === 200) {
      feedList.value = [...feedList.value, ...res.data.list]
      hasMore.value = res.data.hasMore
      page.value++
    }
  } catch (error) {
    console.error('加载失败:', error)
  } finally {
    loading.value = false
    isLoadingMore = false
  }
}

// 滚动加载
const handleScroll = () => {
  // 防止重复触发
  if (isLoadingMore || loading.value || !hasMore.value) return

  const scrollContainer = document.querySelector('.scroll-container')
  if (!scrollContainer) return

  const { scrollTop, scrollHeight, clientHeight } = scrollContainer

  // 距离底部 10px 时触发加载
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    isLoadingMore = true
    loadData()
  }
}

// 监听数据变化，重新分配
watch(feedList, newList => distributeToColumns(newList), { immediate: true })

// 初始化加载数据
onMounted(() => {
  loadData()
  const scrollContainer = document.querySelector('.scroll-container')
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', handleScroll)
  }
})

// 监听组件卸载
onUnmounted(() => {
  const scrollContainer = document.querySelector('.scroll-container')
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
/* 瀑布流容器 */
.waterfall-container {
  display: flex;
  flex-direction: column;
  padding: clamp(6px, 2vw, 8px);
  padding-bottom: 20px;
}

/* 两列容器 */
.waterfall-columns {
  display: flex;
  gap: clamp(6px, 2vw, 8px);
}

/* 每一列 */
.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 2vw, 8px);
}

/* 卡片 */
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
  color: #3d3d3d;
}

/* 加载更多容器 */
.load-more-container {
  width: 100%;
  margin-top: 8px;
}

/* 加载更多 */
.loading-more,
.no-more {
  text-align: center;
  padding: 16px;
  font-size: 12px;
  color: #999;
  width: 100%;
}

/* 大屏幕 */
@media (min-width: 1200px) {
  .waterfall-container {
    max-width: 1400px;
    margin: 0 auto;
  }
}

/* 小屏幕 */
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
