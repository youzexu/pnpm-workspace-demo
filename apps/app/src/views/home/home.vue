<template>
  <div>
    <!-- 导航栏 -->
    <div class="navigationBar">
      <img class="sidepng" src="@/icons/home/side.png" @click="openDrawer" />
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
      <img class="discoverpng" src="@/icons/home/discover.png" @click="goToSearch" />
    </div>
    <!-- 侧边栏 -->
    <Drawer :isOpen="isDrawerOpen" @close="closeDrawer" />
    <!-- 筛选框 -->
    <div class="filter-container" :class="{ expanded: isFilterExpanded }">
      <div class="filter-bar">
        <div class="filter-row">
          <div
            v-for="item in defaultFilters"
            :key="item.id"
            class="filter-row-item"
            :class="{ active: currentFilter === item.id }"
            @click="selectFilter(item)"
          >
            {{ item.name }}
          </div>
        </div>
        <img
          class="dropdown-png"
          src="@/icons/home/dropdown.png"
          @click="toggleFilterExpand"
          :class="{ rotated: isFilterExpanded }"
        />
      </div>
      <!-- 展开的更多筛选项 -->
      <transition name="expand">
        <div class="filter-expand" v-if="isFilterExpanded">
          <div class="filter-expand-row" v-for="(row, rowIndex) in filterRows" :key="rowIndex">
            <div
              v-for="item in row"
              :key="item.id"
              class="filter-row-item"
              :class="{ active: currentFilter === item.id }"
              @click="selectFilter(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </transition>
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
        @click="handleNavClick(item, index)"
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
    <!-- 首页发布按钮 -->
    <Publish :isOpen="isPublishOpen" @close="closePublish" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
// 组件
import Drawer from './components/drawer.vue'
import Publish from './components/publish.vue'
//mock数据
import { fetchMockData } from '@/utils/mockData'

// 未选中图标
import homeIcon from '@/icons/home/home.png'
import knowledgeIcon from '@/icons/home/knowledge.png'
import publishIcon from '@/icons/home/publish.png'
import messageIcon from '@/icons/home/message.png'
import myIcon from '@/icons/home/my.png'
import notSelectedIcon from '@/icons/home/like1.png'

// 选中图标
import likeIcon from '@/icons/home/like.png'
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
interface NaviBar {
  label: string
  icon: string
  activeIcon: string
  isPublish: boolean
}
interface Tab {
  name: string
  id: number
}
// 发布按钮展开/收起
const isPublishOpen = ref(false)
// 侧边栏展开/收起状态
const isDrawerOpen = ref(false)
// 当前筛选项的 ID
const currentFilter = ref(1)
// 筛选框展开/收起状态
const isFilterExpanded = ref(false)
// 导航栏选项
const selected = ref(0)
// 底部导航栏选项
const activeIndex = ref(0)
// 热门推荐列表
const feedList = ref<FeedItem[]>([])
// 加载状态
const loading = ref(false)
// 分页参数
const page = ref(1)
// 是否还有更多数据
const hasMore = ref(true)
// 路由实例
const router = useRouter()

// 定义筛选项数组
const allFilters = [
  { name: '推荐', id: 1 },
  { name: '最新', id: 2 },
  { name: '热门', id: 3 },
  { name: '附近', id: 4 },
  { name: '价格', id: 5 },
  { name: '销量', id: 6 },
  { name: '评分', id: 7 },
  { name: '距离', id: 8 },
  { name: '时间', id: 9 },
  { name: '类型', id: 10 },
  { name: '品牌', id: 11 },
  { name: '材质', id: 12 },
  { name: '尺寸', id: 13 },
  { name: '颜色', id: 14 }
]
// 创建底部导航栏图标路径函数
const navItems = [
  {
    icon: homeIcon,
    activeIcon: homeActiveIcon,
    label: '首页',
    isPublish: false
  },
  {
    icon: knowledgeIcon,
    activeIcon: knowledgeActiveIcon,
    label: '知识库',
    isPublish: false
  },
  {
    icon: publishIcon,
    activeIcon: publishActiveIcon,
    label: '',
    isPublish: true
  },
  {
    icon: messageIcon,
    activeIcon: messageActiveIcon,
    label: '消息',
    isPublish: false
  },
  {
    icon: myIcon,
    activeIcon: myActiveIcon,
    label: '我的',
    isPublish: false
  }
]
// 定义导航栏选项数组
const tabs = [{ name: '发现' }, { name: '暂定' }, { name: '暂定' }]
// 默认显示的5个筛选项
const defaultFilters = computed(() => allFilters.slice(0, 5))
// 展开时显示的更多筛选项（除了前5个）
const moreFilters = computed(() => allFilters.slice(5))
// 每排5个，计算行数
const filterRows = computed(() => {
  const rows = []
  for (let i = 0; i < moreFilters.value.length; i += 5) {
    rows.push(moreFilters.value.slice(i, i + 5))
  }
  return rows
})
// 跳转到搜索页面
const goToSearch = () => {
  router.push('/home/search')
}
// 打开侧边栏函数
const openDrawer = () => {
  isDrawerOpen.value = true
}
// 关闭侧边栏函数
const closeDrawer = () => {
  isDrawerOpen.value = false
}
// 处理底部导航栏点击
const handleNavClick = (item: NaviBar, index: number) => {
  if (item.isPublish) {
    // 发布按钮：打开发布弹窗
    isPublishOpen.value = true
  } else {
    // 普通按钮：切换选中状态
    activeIndex.value = index
  }
}
// 关闭发布弹窗
const closePublish = () => {
  isPublishOpen.value = false
}

// 切换展开/收起
const toggleFilterExpand = () => {
  isFilterExpanded.value = !isFilterExpanded.value
}

// 选择筛选项函数
const selectFilter = (item: Tab) => {
  currentFilter.value = item.id
}
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
  transition: color 0.5s;
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
  margin-top: 94px;
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
/* 筛选框容器 */
.filter-container {
  position: fixed;
  top: 50px;
  left: 0;
  width: 375px;
  background: white;
  z-index: 99;
  border-bottom: 1px solid #efefef;
  transition: border-bottom 0.3s ease;
}
.filter-container.expanded {
  border-bottom: 1px solid transparent;
}
/* 筛选框样式 */
.filter-bar {
  display: flex;
  align-items: center;
  height: 44px;
  background: white;
  padding-left: 8px;
  padding-right: 8px;
  box-sizing: border-box;
}

.filter-row {
  display: flex;
  gap: 8px;
  align-items: center;
  overflow-x: auto;
}

.filter-row::-webkit-scrollbar {
  display: none;
}

.filter-row-item {
  width: 58px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  background: #f9f9f9;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s;
  box-sizing: border-box;
  font-family: PingFang SC;
  font-size: 12px;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #262e29;
}

.filter-row-item.active {
  /* 选中状态 */
  color: #37d081;
  background: rgba(55, 208, 129, 0.1);
}
.dropdown-png {
  width: 16px;
  height: 16px;
  cursor: pointer;
  flex-shrink: 0;
  margin-left: 11px;
  transition: transform 0.3s ease;
}
.dropdown-png.rotated {
  transform: rotate(180deg);
}
/* 展开的更多筛选项  */
.filter-expand {
  background: white;
  padding: 0 12px 12px 8px;
  box-sizing: border-box;
}

.filter-expand-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.filter-expand-row:last-child {
  margin-bottom: 0;
}
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
