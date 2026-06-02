<template>
  <div class="search-results-wrapper">
    <!-- 加载中 -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 空状态 -->
    <div v-else-if="userList.length === 0 && !loading" class="empty-state">
      <img src="@/icons/home/home-search/image.png" class="empty-image" />
      <div class="empty-text">
        <p class="empty-title">这里空空的</p>
        <p class="empty-desc">换个关键词试试吧</p>
      </div>
    </div>

    <!-- 用户列表 -->
    <div v-else class="user-container">
      <div v-for="user in userList" :key="user.id" class="user-card">
        <!-- 头像 -->
        <div class="user-avatar">
          <img :src="user.avatar" :alt="user.name" />
        </div>

        <!-- 用户信息 -->
        <div class="user-info">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-bio">{{ user.bio }}</div>
          <div class="user-stats">
            <span class="stat-item">笔记：{{ user.notesCount }}</span>
            <span class="stat-item">藏品：{{ user.collectionsCount }}</span>
          </div>
        </div>

        <!-- 关注按钮 -->
        <button
          class="follow-btn"
          :class="{
            followed: user.isFollowed && user.followStatus !== '互相关注',
            mutual: user.followStatus === '互相关注'
          }"
          @click="handleFollow(user)"
        >
          {{ user.followStatus }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { searchUserData, followUser } from '@/utils/mockUser'

interface UserItem {
  id: number
  name: string
  avatar: string
  bio: string
  isFollowed: boolean
  followStatus: '关注' | '已关注' | '互相关注'
  notesCount: number
  collectionsCount: number
}

const props = defineProps<{
  searchList?: UserItem[]
  loading?: boolean
  searchKeyword?: string
}>()

const userList = ref<UserItem[]>([])
const isLoading = ref(false)
const page = ref(1)
const hasMore = ref(true)
const pageSize = 10

// 搜索用户
const searchUsers = async (keyword: string, reset: boolean = true) => {
  if (!keyword.trim()) {
    userList.value = []
    return
  }

  if (reset) {
    page.value = 1
    userList.value = []
    hasMore.value = true
  }

  if (isLoading.value || !hasMore.value) return

  isLoading.value = true
  try {
    const res = await searchUserData(keyword, page.value, pageSize)
    if (res.code === 200) {
      if (reset) {
        userList.value = res.data.list
      } else {
        userList.value = [...userList.value, ...res.data.list]
      }
      hasMore.value = res.data.hasMore
      page.value++
    }
  } finally {
    isLoading.value = false
  }
}

// 关注/取消关注
const handleFollow = async (user: UserItem) => {
  const res = await followUser(user.id)
  if (res.code === 200) {
    user.isFollowed = res.data.isFollowed
    user.followStatus = res.data.followStatus
  }
}

// 监听搜索关键词变化
watch(
  () => props.searchKeyword,
  newKeyword => {
    if (newKeyword) {
      searchUsers(newKeyword, true)
    } else {
      userList.value = []
    }
  },
  { immediate: true }
)
</script>

<style scoped>
/* 最外层容器  */
.search-results-wrapper {
  background: white;
  padding: 0px 0px;
  position: relative;
  min-height: 416px;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #f0f0f0;
  border-top-color: #37d081;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  font-size: 16px;
  font-weight: 500;
  font-family: PingFang SC;
  color: #666;
}

/* 空状态样式 */
.empty-state {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 119px;
  text-align: center;
}

.empty-image {
  width: 100px;
  height: 100px;
  margin: 0 auto 24px;
  display: block;
}

.empty-title {
  font-family: PingFang SC;
  font-size: 16px;
  font-weight: normal;
  line-height: 26px;
  text-align: center;
  color: #262e29;
  margin-bottom: 4px;
}

.empty-desc {
  font-family: PingFang SC;
  font-size: 14px;
  font-weight: normal;
  line-height: 22px;
  text-align: center;
  color: rgba(44, 53, 47, 0.4);
}

/* 用户列表容器 */
.user-container {
  padding: 8px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.user-container::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

/* 用户卡片 */
.user-card {
  position: relative;
  width: 100%;
  height: 64px;
  margin-bottom: 12px;
  background: white;
  border-radius: 2px;
}

/* 头像 */
.user-avatar {
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
}

.user-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

/* 用户信息 */
.user-info {
  position: absolute;
  left: 56px;
  top: 0;
  width: calc(100% - 56px - 60px);
  height: 64px;
}

.user-name {
  position: absolute;
  left: 0;
  top: 0;
  width: 75px;
  height: 24px;
  font-family: PingFang SC;
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  color: #262e29;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-bio {
  position: absolute;
  left: 0;
  top: 24px;
  width: 100%;
  height: 20px;
  font-family: PingFang SC;
  font-size: 12px;
  font-weight: normal;
  line-height: 20px;
  color: rgba(44, 53, 47, 0.6);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-stats {
  position: absolute;
  left: 0;
  top: 44px;
  display: flex;
  gap: 16px;
  align-items: center;
}

.stat-item {
  font-family: PingFang SC;
  font-size: 12px;
  font-weight: normal;
  line-height: 20px;
  color: #262e29;
  white-space: nowrap;
}

/* 关注按钮 */
.follow-btn {
  position: absolute;
  right: 0;
  top: 20px;
  width: 52px;
  height: 24px;
  border-radius: 2px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: PingFang SC;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  color: #30c591;
  padding: 0;
}

/* 已关注状态 */
.follow-btn.followed {
  width: 52px;
  background: rgba(44, 53, 47, 0.1);
  color: rgba(44, 53, 47, 0.4);
}

/* 互相关注状态 */
.follow-btn.mutual {
  width: 64px;
  background: rgba(44, 53, 47, 0.1);
  color: rgba(44, 53, 47, 0.4);
}

.follow-btn:hover {
  opacity: 0.8;
}
</style>
