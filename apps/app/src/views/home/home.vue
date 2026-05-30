<template>
  <div>
    <!-- 导航栏 -->
    <div class="navigationBar">
      <img class="sidepng" src="@/icons/home/side.png" />
      <div class="navigationBarContent">
        <div
          v-for="(item, index) in tabs"
          :key="index"
          class="tab-item"
          :class="{ active: selected === index }"
          @click="selected = index"
        >
          <div class="tab-text-wrapper">
            <div class="tab-text">{{ item.name }}</div>
            <img v-if="selected === index" class="tab-indicator" src="@/icons/home/leaf.png" />
          </div>
        </div>
      </div>
      <img class="discoverpng" src="@/icons/home/discover.png" />
    </div>
    <!-- 主内容区域 -->
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
    <!-- 底部导航栏 -->
    <div class="footerNavigationBar">
      <div
        v-for="(item, index) in navItems"
        :key="index"
        class="nav-item"
        @click="activeIndex = index"
      >
        <img
          class="nav-icon"
          :class="{ 'publish-icon': item.isPublish }"
          :src="activeIndex === index ? item.activeIcon : item.icon"
        />
        <span class="nav-label" :class="{ active: activeIndex === index }">
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchMockData } from '@/utils/mockData'
import likeIcon from '@/icons/home/like.png'
import notSelectedIcon from '@/icons/home/like1.png'

// 未选中图标
import homeIcon from '@/icons/home/home.png'
import knowledgeIcon from '@/icons/home/knowledge.png'
import publishIcon from '@/icons/home/publish.png'
import messageIcon from '@/icons/home/message.png'
import myIcon from '@/icons/home/my.png'

// 选中图标
import homeActiveIcon from '@/icons/home/home1.png'
import knowledgeActiveIcon from '@/icons/home/knowledge1.png'
import publishActiveIcon from '@/icons/home/publish.png'
import messageActiveIcon from '@/icons/home/message1.png'
import myActiveIcon from '@/icons/home/my1.png'

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
const selected = ref(0)
const activeIndex = ref(0)

const feedList = ref<FeedItem[]>([])
const loading = ref(false)
const page = ref(1)
const hasMore = ref(true)

const tabs = [{ name: '发现' }, { name: '暂定' }, { name: '暂定' }]
// 加载数据
const loadData = async () => {
  if (loading.value) return

  loading.value = true
  try {
    const res = await fetchMockData(page.value, 30)
    if (res.code === 200) {
      feedList.value = [...feedList.value, ...res.data.list]
      hasMore.value = res.data.hasMore
      page.value++
    }
  } finally {
    loading.value = false
  }
}
// 格式化数字
const formatNumber = (num: number) => {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  return num.toString()
}
// 创建底部导航栏图标路径函数
const navItems = [
  { icon: homeIcon, activeIcon: homeActiveIcon, label: '首页' },
  { icon: knowledgeIcon, activeIcon: knowledgeActiveIcon, label: '知识库' },
  { icon: publishIcon, activeIcon: publishActiveIcon, label: '', isPublish: true },
  { icon: messageIcon, activeIcon: messageActiveIcon, label: '消息' },
  { icon: myIcon, activeIcon: myActiveIcon, label: '我的' }
]
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
onMounted(() => {
  loadData()
})
</script>

<style scoped>
/* 导航栏样式 */
.navigationBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 375px;
  height: 50px;
  border: 1px solid #efefef;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px;
  box-sizing: border-box;
  z-index: 100;
}

.discoverpng,
.sidepng {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.navigationBarContent {
  display: flex;
  gap: 24px;
}

.tab-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.tab-text-wrapper {
  position: relative;
  display: inline-block;
}

.tab-text {
  font-family: PingFang SC;
  font-size: 16px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0px;
  font-variation-settings: 'opsz' auto;
  color: rgba(44, 53, 47, 0.6);
  transition: all 0.3s;
  position: relative;
  z-index: 2;
}

.tab-item.active .tab-text {
  font-size: 16px;
  line-height: 26px;
  color: #262e29;
}

.tab-indicator {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
  width: 18.8px;
  height: 28.71px;
  background: linear-gradient(222deg, #4ef9a1 25%, rgba(78, 249, 161, 0) 97%);
  border-radius: 50%; /* 添加圆角，变成椭圆 */
  pointer-events: none;
}
/* 底部导航栏样式 */
.footerNavigationBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 375px;
  height: 48px;
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  z-index: 100;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.nav-item {
  /* 导航项容器 - 垂直排列 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.nav-label {
  /* 文字样式 */
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  color: rgba(44, 53, 47, 0.4);
  transition: color 0.3s;
  margin-top: 2px;
}

.nav-label.active {
  /* 选中状态文字样式 */
  color: #262e29;
}
.nav-icon {
  width: 24px;
  height: 24px;
}
/* 发布按钮样式 */
.nav-icon.publish-icon {
  width: 48px;
  height: 36px;
  border-radius: 4px;
  background: linear-gradient(53deg, #1f2622 0%, #314037 99%);
}

.nav-icon.publish-icon.active {
  background: linear-gradient(53deg, #37d081 0%, #2db872 99%);
}
/* 瀑布流容器 */
.waterfall-container {
  column-count: 2;
  column-gap: 7px;
  margin-top: 50px;
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
  /* 字体大小样式 */
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
