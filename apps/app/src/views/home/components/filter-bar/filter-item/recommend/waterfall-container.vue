<!-- 瀑布流容器，负责分配列数和滚动事件监听 -->
<template>
  <div class="waterfall-wrapper">
    <div class="waterfall-container">
      <div class="waterfall-columns" :style="{ gap: gap + 'px' }">
        <WaterfallColumn
          v-for="(column, colIndex) in dynamicColumns"
          :key="colIndex"
          :column="column"
          :column-count="columnCount"
          :gap="gap"
          @toggle-like="item => emit('toggleLike', item)"
        />
      </div>
      <!-- 加载更多容器 -->
      <div class="load-more-container">
        <div v-if="loading" class="loading-more">加载中...</div>
        <div v-else-if="!hasMore && feedList.length > 0" class="no-more">没有更多了</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted, onActivated } from 'vue'
import WaterfallColumn from './waterfall-column.vue'
import type { FeedItem } from '@/utils/mockData'

const props = defineProps<{
  feedList: FeedItem[]
  loading: boolean
  hasMore: boolean
}>()
// 事件发射
const emit = defineEmits<{
  (e: 'toggleLike', item: FeedItem): void
  (e: 'loadMore'): void
  (e: 'scroll', scrollTop: number): void
}>()

// 配置
const gap = 8
const columnCount = ref(2)
const dynamicColumns = ref<FeedItem[][]>([])

// 获取滚动容器的函数
const getScrollContainer = (): HTMLElement | null => {
  return document.querySelector('.scroll-container')
}

// 滚动事件
const handleParentScroll = () => {
  const scrollContainer = getScrollContainer()
  if (!scrollContainer) return

  const { scrollTop, scrollHeight, clientHeight } = scrollContainer

  // 向上传递滚动位置给父组件保存
  emit('scroll', scrollTop)

  // 触底检测
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    emit('loadMore')
  }
}

// 绑定滚动事件到父容器
const bindScrollEvent = () => {
  const scrollContainer = getScrollContainer()

  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handleParentScroll)
    scrollContainer.addEventListener('scroll', handleParentScroll)
  } else {
    setTimeout(bindScrollEvent, 100)
  }
}

// 设置滚动容器的scrollTop值
const setScrollTop = (top: number) => {
  const scrollContainer = getScrollContainer()
  if (scrollContainer) {
    scrollContainer.scrollTop = top
  }
}
// 获取滚动容器的scrollTop值
const getScrollTop = () => {
  const scrollContainer = getScrollContainer()
  const top = scrollContainer?.scrollTop || 0
  return top
}

// 更新列数
const updateColumnCount = () => {
  const width = window.innerWidth
  if (width >= 1200) columnCount.value = 4
  else if (width >= 768) columnCount.value = 3
  else columnCount.value = 2
}

// 分配数据到列
const distributeToColumns = (items: FeedItem[]) => {
  const columns: FeedItem[][] = Array(columnCount.value)
    .fill(null)
    .map(() => [])
  const columnHeights: number[] = Array(columnCount.value).fill(0)

  items.forEach(item => {
    const itemHeight = item.height || 300
    let minIndex = 0
    for (let i = 1; i < columnCount.value; i++) {
      if (columnHeights[i] < columnHeights[minIndex]) minIndex = i
    }
    columns[minIndex].push(item)
    columnHeights[minIndex] += itemHeight
  })

  dynamicColumns.value = columns
}

// 监听数据变化
watch(
  () => props.feedList,
  newList => {
    updateColumnCount()
    distributeToColumns(newList)
  },
  { immediate: true }
)

// 窗口适配
const handleResize = () => {
  updateColumnCount()
  if (props.feedList.length > 0) {
    distributeToColumns(props.feedList)
  }
}

// 生命周期
onMounted(() => {
  bindScrollEvent()
  window.addEventListener('resize', handleResize)
})
// 激活时重新绑定事件
onActivated(() => {
  bindScrollEvent()
})
// 离开时解绑事件
onUnmounted(() => {
  const scrollContainer = getScrollContainer()
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handleParentScroll)
  }
  window.removeEventListener('resize', handleResize)
})
// 暴露给父组件的方法
defineExpose({
  setScrollTop,
  getScrollTop
})
</script>

<style scoped>
/* 滚动容器样式 */
.waterfall-wrapper {
  display: flex;
  flex-direction: column;
}
/* 瀑布流容器样式 */
.waterfall-container {
  padding: clamp(6px, 2vw, 8px);
  padding-bottom: 20px;
}
/* 瀑布列样式 */
.waterfall-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
/* 加载更多容器样式 */
.load-more-container {
  width: 100%;
  margin-top: 8px;
}

.loading-more,
.no-more {
  text-align: center;
  padding: 16px;
  font-size: 12px;
  color: #999;
}

@media (min-width: 1200px) {
  .waterfall-wrapper {
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }
}

@media (max-width: 350px) {
  .waterfall-container {
    padding: 4px;
  }
  .waterfall-columns {
    gap: 4px;
  }
}
</style>
