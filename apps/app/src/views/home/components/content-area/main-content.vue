<!-- 瀑布流组件 -->
<template>
  <div class="waterfall-container">
    <div v-for="item in feedList" :key="item.id" class="waterfall-card">
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
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import notSelectedIcon from '@/icons/home/like1.png'
import likeIcon from '@/icons/home/like.png'
import { fetchMockData } from '@/utils/mockData'

// 计算 margin-to

// 定义 FeedItem 接口
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

// 热门推荐列表
const feedList = ref<FeedItem[]>([])
// 加载状态
const loading = ref(false)
// 分页参数
const page = ref(1)
// 是否还有更多数据
const hasMore = ref(true)

// 格式化数字
const formatNumber = (num: number) => {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  return num.toString()
}

// 点赞/取消点赞函数
const toggleLike = (item: FeedItem) => {
  if (item.isLiked) {
    item.isLiked = false
    item.likes--
  } else {
    item.isLiked = true
    item.likes++
  }
}

// 加载数据
const loadData = async () => {
  if (loading.value) return

  loading.value = true
  try {
    const res = await fetchMockData(page.value, 50)
    if (res.code === 200) {
      feedList.value = [...feedList.value, ...res.data.list]
      hasMore.value = res.data.hasMore
      page.value++
    }
  } finally {
    loading.value = false
  }
}

// 加载数据
onMounted(() => {
  loadData()
})
</script>

<style scoped>
/* 瀑布流容器 */
.waterfall-container {
  column-count: 2;
  column-gap: 7px;
  padding: 8px;
  margin-bottom: 60px;
  padding-bottom: 60px;
}

/* 卡片样式 */
.waterfall-card {
  break-inside: avoid;
  margin-bottom: 8px;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* 图片区域 */
.card-image {
  position: relative;
  width: 100%;
}

.card-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* 卡片内容 */
.card-content {
  padding: 10px;
  padding-top: 4px;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  margin-top: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  line-height: 22px;
  color: #3d3d3d;
  letter-spacing: 0px;
}

/* 底部信息 */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
}

.author-avatar {
  width: 20px;
  height: 20px;
  opacity: 1;
  border-radius: 50%;
}

.author-name {
  font-family: PingFang SC;
  font-size: 10px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: 0px;
}

.likes-info {
  display: flex;
  align-items: center;
  gap: 4px;
}

.likes-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.likes-icon:active {
  transform: scale(1.2);
}

.fontSize {
  font-family: PingFang SC;
  font-size: 12px;
  font-weight: normal;
  line-height: 20px;
  text-align: right;
  letter-spacing: 0px;
  color: #3d3d3d;
  z-index: 1;
}
</style>
