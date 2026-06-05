import { defineStore } from 'pinia'

export type FollowStatusType = '关注' | '已关注' | '互相关注'

export interface FollowStatus {
  isFollowed: boolean
  followStatus: FollowStatusType
}

export const useUserStore = defineStore('user', {
  // 用户关注状态缓存
  state: () => ({
    followCache: {} as Record<number, FollowStatus>
  }),

  actions: {
    // 获取用户关注状态
    getFollowStatus(userId: number): FollowStatus {
      return this.followCache[userId] || { isFollowed: false, followStatus: '关注' }
    },

    // 设置用户关注状态
    setFollowStatus(userId: number, status: FollowStatus) {
      this.followCache[userId] = status
    },

    // 切换关注状态
    toggleFollow(userId: number): FollowStatus {
      const current = this.getFollowStatus(userId)
      const newIsFollowed = !current.isFollowed
      let newFollowStatus: '关注' | '已关注' | '互相关注' = '关注'

      if (newIsFollowed) {
        newFollowStatus = Math.random() > 0.7 ? '互相关注' : '已关注'
      }

      const newStatus = { isFollowed: newIsFollowed, followStatus: newFollowStatus }
      this.setFollowStatus(userId, newStatus)
      return newStatus
    },

    // 批量初始化用户关注状态
    initFollowStatus(users: Array<{ id: number; isFollowed: boolean; followStatus: string }>) {
      users.forEach(user => {
        if (!this.followCache[user.id]) {
          this.followCache[user.id] = {
            isFollowed: user.isFollowed,
            followStatus: user.followStatus as '关注' | '已关注' | '互相关注'
          }
        }
      })
    }
  }
})
