<template>
  <div class="search-results-wrapper">
    <!-- 加载中 -->
    <div v-if="loading || isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 空状态 -->
    <div v-else-if="userList.length === 0" class="empty-state">
      <img src="@/icons/home/home-search/image.png" class="empty-image" />
      <div class="empty-text">
        <p class="empty-title">这里空空的</p>
        <p class="empty-desc">换个关键词试试吧</p>
      </div>
    </div>

    <!-- 用户列表 -->
    <div v-else class="user-container">
      <div v-for="user in userList" :key="user.id" class="user-card">
        <div class="user-avatar">
          <img :src="user.avatar" :alt="user.name" />
        </div>

        <div class="user-info">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-bio">{{ user.bio || '这个人很懒，什么都没写~' }}</div>
          <div class="user-stats">
            <span class="stat-item">笔记：{{ user.notesCount }}</span>
            <span class="stat-item">藏品：{{ user.collectionsCount }}</span>
          </div>
        </div>

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

// 监听搜索关键词
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
/* 整体容器 */
.search-results-wrapper {
  background: white;
  min-height: 416px;
  padding: 0;
  position: relative;
}

/* ========== 加载状态 ========== */
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
  to { transform: rotate(360deg); }
}

.loading-state p {
  font-size: 16px;
  font-weight: 500;
  color: #666;
}

/* ========== 空状态 ========== */
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
  font-size: 16px;
  color: #262e29;
  margin-bottom: 4px;
}

.empty-desc {
  font-size: 14px;
  color: rgba(44, 53, 47, 0.4);
}

/* ========== 用户列表 ========== */
.user-container {
  padding: 8px;
  overflow-y: auto;
  max-height: calc(100vh - 120px); 
  scrollbar-width: thin; 
}

.user-container::-webkit-scrollbar {
  display: none;
}

/* 用户卡片 - Flex 布局 */
.user-card {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 64px;
  margin-bottom: 12px;
  background: white;
  padding: 8px;
  box-sizing: border-box;
}

/* 头像 */
.user-avatar {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

/* 用户信息  */
.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 15px;
  font-weight: 600;
  color: #262e29;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-bio {
  font-size: 12px;
  color: rgba(44, 53, 47, 0.6);
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-stats {
  display: flex;
  gap: 16px;
  margin-top: 4px;
}

.stat-item {
  font-size: 12px;
  color: #262e29;
}

/* 关注按钮 */
.follow-btn {
  flex-shrink: 0;
  width: 52px;
  height: 24px;
  border-radius: 2px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: #30c591;
}

.follow-btn.followed {
  background: rgba(44, 53, 47, 0.1);
  color: rgba(44, 53, 47, 0.4);
}

.follow-btn.mutual {
  width: 64px;
  background: rgba(44, 53, 47, 0.1);
  color: rgba(44, 53, 47, 0.4);
}

.follow-btn:hover {
  opacity: 0.8;
}

/* ========== 屏幕适配 ========== */
@media (max-width: 350px) {
  .user-card {
    gap: 6px;
    padding: 6px;
  }
  .user-avatar {
    width: 40px;
    height: 40px;
  }
  .user-name {
    font-size: 14px;
  }
  .user-bio {
    font-size: 11px;
  }
  .stat-item {
    font-size: 11px;
  }
  .follow-btn {
    width: 48px;
    font-size: 11px;
  }
  .follow-btn.mutual {
    width: 56px;
  }
}

@media (max-width: 320px) {
  .user-stats {
    gap: 10px;
  }
}

/* 横屏适配 */
@media (orientation: landscape) and (max-height: 450px) {
  .user-container {
    padding: 4px;
  }
  .user-card {
    min-height: 56px;
    margin-bottom: 8px;
  }
  .user-avatar {
    width: 40px;
    height: 40px;
  }
}
</style>