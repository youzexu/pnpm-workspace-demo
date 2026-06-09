<!-- 推荐组件，负责加载和显示推荐内容 -->
<template>
  <div class="recommend-wrapper">
    <WaterfallContainer
      ref="waterfallRef"
      :feed-list="feedList"
      :loading="loading"
      :has-more="hasMore"
      @toggle-like="handleToggleLike"
      @load-more="loadData"
      @scroll="handleScroll"
    />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Recommend'
})
import { ref, onMounted, onActivated, onDeactivated, onUnmounted, nextTick } from 'vue'
import WaterfallContainer from './recommend/waterfall-container.vue'
import { fetchMockData, FeedItem } from '@/utils/mockData'
import { useUserStore } from '@/stores/user'
import { useWaterfallStore } from '@/stores/waterfall'
import { useLikeStore } from '@/stores/like'

const userStore = useUserStore()
const waterfallStore = useWaterfallStore()
const likeStore = useLikeStore()

// 组件引用
const waterfallRef = ref<InstanceType<typeof WaterfallContainer>>()

// 数据
const feedList = ref<FeedItem[]>([])
const loading = ref(false)
const page = ref(1)
const hasMore = ref(true)

// 点赞处理
const handleToggleLike = (item: FeedItem) => {
  const result = likeStore.toggleLike(item.id, item.likes)
  item.isLiked = result.isLiked
  item.likes = result.likes
}

// 同步关注状态到列表
const syncFollowStatus = () => {
  feedList.value.forEach(item => {
    const cached = userStore.getFollowStatus(item.author.id)
    item.author.isFollowed = cached.isFollowed
    item.author.followStatus = cached.followStatus
  })
}
// 同步点赞状态到列表
const syncLikeStatus = () => {
  feedList.value.forEach(item => {
    const cached = likeStore.getLikeStatus(item.id)
    item.isLiked = cached.isLiked
    item.likes = cached.likes
  })
}

// 数据保存和恢复管理
const saveDataToStore = () => {
  waterfallStore.saveRecommendData(feedList.value, page.value, hasMore.value)
}
// 数据恢复管理
const restoreDataFromStore = (): boolean => {
  if (waterfallStore.recommendData.length > 0) {
    feedList.value = waterfallStore.recommendData
    page.value = waterfallStore.recommendPage
    hasMore.value = waterfallStore.recommendHasMore
    return true
  }
  return false
}

//滚动位置管理
const handleScroll = (scrollTop: number) => {
  waterfallStore.saveRecommendScrollTop(scrollTop)
}
// 保存滚动位置管理
const saveScrollPosition = () => {
  if (waterfallRef.value) {
    const scrollTop = waterfallRef.value.getScrollTop()
    waterfallStore.saveRecommendScrollTop(scrollTop)
  }
}
// 恢复滚动位置管理
const restoreScrollPosition = async () => {
  await nextTick()
  const scrollTop = waterfallStore.recommendScrollTop
  if (waterfallRef.value && scrollTop > 0) {
    waterfallRef.value.setScrollTop(scrollTop)
    console.log('恢复滚动位置:', scrollTop)
  }
}

// 加载数据
const loadData = async () => {
  if (loading.value || !hasMore.value) return

  loading.value = true
  try {
    const res = await fetchMockData(page.value, 10)
    if (res.code === 200) {
      // 批量初始化关注状态
      const users = res.data.list.map(item => ({
        id: item.author.id,
        isFollowed: item.author.isFollowed,
        followStatus: item.author.followStatus
      }))
      userStore.initFollowStatus(users)

      const likes = res.data.list.map(item => ({
        id: item.id,
        isLiked: item.isLiked,
        likes: item.likes
      }))
      likeStore.initLikeStatus(likes)

      feedList.value = [...feedList.value, ...res.data.list]
      hasMore.value = res.data.hasMore
      page.value++
      saveDataToStore()
    }
  } catch (error) {
    console.error('加载失败:', error)
  } finally {
    loading.value = false
  }
}

// 首次挂载
onMounted(async () => {
  // 从 store 恢复数据
  if (!restoreDataFromStore()) {
    await loadData()
  }
  syncLikeStatus()
  syncFollowStatus()
  await restoreScrollPosition()
})

// 从缓存激活时调用
onActivated(async () => {
  await restoreScrollPosition()
  syncLikeStatus()
  syncFollowStatus()
})
// 从缓存卸载时调用
onDeactivated(() => {
  saveScrollPosition()
})
// 组件卸载时调用
onUnmounted(() => {
  saveDataToStore()
  saveScrollPosition()
})
</script>

<style scoped>
/* 推荐组件样式 */
.recommend-wrapper {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
