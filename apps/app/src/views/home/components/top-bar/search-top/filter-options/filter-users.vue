<template>
  <div class="search-results-wrapper">
    <!-- 加载中 -->
    <common-states v-if="loading || isLoading" type="loading" />
    
    <!-- 空状态 -->
    <common-states v-else-if="userList.length === 0" type="empty" />
    
    <!-- 用户列表 -->
    <div v-else class="user-container">
      <div v-for="user in userList" :key="user.id" class="user-card">
        <div class="user-avatar" @click="goToUserDetail(user)">
          <img :src="user.avatar" :alt="user.name" />
        </div>
        <div class="user-info" @click="goToUserDetail(user)">
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
          @click.stop="handleFollow(user)"
        >
          {{ user.followStatus }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { searchUserData, followUser } from '@/utils/mockData'
import { useNavigation } from '@/composables/useNavigation'
import CommonStates from './common-states.vue'

// 导入类型
import type { UserItem } from '@/utils/mockData'

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
const { goToUserDetail } = useNavigation()

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
  position: relative;
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

/* 用户卡片  */
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
