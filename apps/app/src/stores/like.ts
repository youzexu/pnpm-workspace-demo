// stores/like.ts
import { defineStore } from 'pinia'

export interface LikeStatus {
  isLiked: boolean
  likes: number
}

export const useLikeStore = defineStore('like', {
  state: () => ({
    // 点赞状态缓存
    likeCache: {} as Record<number, LikeStatus>
  }),

  actions: {
    // 获取点赞状态
    getLikeStatus(itemId: number): LikeStatus {
      return this.likeCache[itemId] || { isLiked: false, likes: 0 }
    },

    // 设置点赞状态
    setLikeStatus(itemId: number, status: LikeStatus) {
      this.likeCache[itemId] = status
    },

    // 切换点赞状态
    toggleLike(itemId: number, currentLikes: number): LikeStatus {
      const current = this.getLikeStatus(itemId)
      const newIsLiked = !current.isLiked
      const newLikes = newIsLiked ? currentLikes + 1 : currentLikes - 1

      const newStatus = { isLiked: newIsLiked, likes: newLikes }
      this.setLikeStatus(itemId, newStatus)
      return newStatus
    },

    // 批量初始化点赞状态
    initLikeStatus(items: Array<{ id: number; isLiked: boolean; likes: number }>) {
      items.forEach(item => {
        if (!this.likeCache[item.id]) {
          this.likeCache[item.id] = {
            isLiked: item.isLiked,
            likes: item.likes
          }
        }
      })
    },

    // 清除指定内容的点赞缓存
    clearLikeCache(itemId: number) {
      delete this.likeCache[itemId]
    },

    // 清除所有点赞缓存
    clearAllLikeCache() {
      this.likeCache = {}
    }
  }
})
