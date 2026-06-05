import { defineStore } from 'pinia'
import type { FeedItem } from '@/utils/mockData'

export const useWaterfallStore = defineStore('waterfall', {
  state: () => ({
    // 推荐页面数据
    recommendData: [] as FeedItem[],
    recommendPage: 1,
    recommendHasMore: true,
    recommendScrollTop: 0
  }),

  actions: {
    // 保存推荐页面数据
    saveRecommendData(data: FeedItem[], page: number, hasMore: boolean) {
      this.recommendData = data
      this.recommendPage = page
      this.recommendHasMore = hasMore
    },

    // 保存滚动位置
    saveRecommendScrollTop(scrollTop: number) {
      this.recommendScrollTop = scrollTop
    },

    // 清除推荐页面数据（刷新时使用）
    clearRecommendData() {
      this.recommendData = []
      this.recommendPage = 1
      this.recommendHasMore = true
      this.recommendScrollTop = 0
    }
  }
})
