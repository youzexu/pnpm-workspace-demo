<template>
  <div class="user-detail">
    <div class="detail-header">
      <img class="back-icon" src="@/icons/picture-details/back.png" @click="goBack" />
      <h1 class="detail-title">用户详细页面</h1>
    </div>
    <!-- 用户信息展示 -->
    <div v-if="userData" class="user-info">
      <img class="user-avatar" :src="userData.avatar" :alt="userData.name" />
      <div class="user-name">{{ userData.name }}</div>
      <div class="user-bio">{{ userData.bio }}</div>
      <div class="user-stats">
        <span>笔记：{{ userData.notesCount }}</span>
        <span>收藏：{{ userData.collectionsCount }}</span>
      </div>
      <button class="follow-btn" :class="{ followed: userData.isFollowed }" @click="toggleFollow">
        {{ userData.isFollowed ? '已关注' : '关注' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { UserItem } from '@/composables/useNavigation'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const userData = ref<UserItem | null>(null)

// 返回上一页
const goBack = () => {
  router.back()
}

// 切换关注 - 更新 store
const toggleFollow = () => {
  if (userData.value) {
    const newStatus = userStore.toggleFollow(userData.value.id)
    userData.value.isFollowed = newStatus.isFollowed
    userData.value.followStatus = newStatus.followStatus
  }
}

// 获取 query 参数
const getQueryData = () => {
  const data = route.query.userData
  return Array.isArray(data) ? data[0] : data || ''
}
// 获取用户数据并解析

onMounted(() => {
  const dataStr = getQueryData()
  if (dataStr) {
    try {
      const decodedData = decodeURIComponent(dataStr)
      const user = JSON.parse(decodedData)
      // 从 store 获取关注状态
      const cachedStatus = userStore.getFollowStatus(user.id)
      userData.value = {
        ...user,
        isFollowed: cachedStatus.isFollowed,
        followStatus: cachedStatus.followStatus
      }
      console.log('解析后的用户数据:', userData.value)
    } catch (error) {
      console.error('解析失败:', error)
    }
  }
})
</script>

<style scoped>
.user-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f5f5f5;
  padding: 16px;
  overflow-y: auto;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.back-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.detail-title {
  font-size: 18px;
  font-weight: 600;
  color: #262e29;
  margin: 0;
}
.user-info {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  color: #262e29;
  margin-bottom: 8px;
}

.user-bio {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.user-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #999;
}

.follow-btn {
  width: 100px;
  height: 36px;
  border-radius: 18px;
  border: none;
  background: #37d081;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.follow-btn.followed {
  background: #f0f0f0;
  color: #666;
}
</style>
