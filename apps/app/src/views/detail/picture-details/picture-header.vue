<!-- 用户头像详情头部组件 -->
<template>
  <div class="user-header">
    <img class="back-icon" src="@/icons/user-details/back.png" @click="goBack" />
    <div class="user-info">
      <div class="user-left" @click="handleGoToUserDetail">
        <img class="user-avatar" :src="userData.avatar" alt="头像" />
        <span class="user-name">{{ userData.name }}</span>
      </div>
      <button class="follow-btn" :class="{ followed: userData.isFollowed }" @click="toggleFollow">
        {{ userData.isFollowed ? '已关注' : '关注' }}
      </button>
    </div>
    <img class="share-icon" src="@/icons/user-details/follow.png" @click="handleShare" />
  </div>
</template>

<script setup lang="ts">
import { useNavigation } from '@/composables/useNavigation'
import type { UserItem } from '@/utils/mockData'

// 修改 Pick 类型，添加 notesCount 和 collectionsCount
const props = defineProps<{
  userData: Pick<
    UserItem,
    'id' | 'name' | 'avatar' | 'isFollowed' | 'followStatus' | 'notesCount' | 'collectionsCount'
  >
}>()

const emit = defineEmits<{
  (e: 'toggleFollow'): void
}>()

const { goToUserDetail } = useNavigation()

const goBack = () => {
  window.history.back()
}

const toggleFollow = () => {
  emit('toggleFollow')
}

const handleShare = () => {
  console.log('分享')
}

// 处理点击用户头像的事件
const handleGoToUserDetail = () => {
  const fullUser: UserItem = {
    id: props.userData.id,
    name: props.userData.name,
    avatar: props.userData.avatar,
    isFollowed: props.userData.isFollowed,
    followStatus: props.userData.followStatus as '关注' | '已关注' | '互相关注',
    bio: '',
    notesCount: props.userData.notesCount,
    collectionsCount: props.userData.collectionsCount
  }
  goToUserDetail(fullUser)
}
</script>

<style scoped>
/* 样式保持不变 */
.user-header {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 375px;
  min-width: 280px;
  height: clamp(44px, 12vh, 50px);
  background: #fff;
  padding: 0 clamp(8px, 4vw, 16px);
  margin: 0 auto;
  position: relative;
  z-index: 10;
  box-sizing: border-box;
}

.back-icon {
  width: clamp(20px, 6vw, 24px);
  height: clamp(20px, 6vw, 24px);
  cursor: pointer;
  flex-shrink: 0;
  margin-right: clamp(20px, 8vw, 30px);
}
.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  gap: clamp(6px, 2vw, 12px);
  min-width: 0;
}

.user-left {
  display: flex;
  align-items: center;
  gap: clamp(6px, 2vw, 12px);
  flex-shrink: 1;
  min-width: 0;
  margin-left: -15px;
}

.user-avatar {
  width: clamp(28px, 8vw, 32px);
  height: clamp(28px, 8vw, 32px);
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.user-name {
  font-size: clamp(12px, 4vw, 14px);
  color: #3d3d3d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 1;
}

.follow-btn {
  width: clamp(36px, 14vw, 40px);
  height: clamp(22px, 7vh, 24px);
  border-radius: 2px;
  border: none;
  background: rgba(55, 208, 129, 0.1);
  color: #37d081;
  font-size: clamp(11px, 3.5vw, 12px);
  cursor: pointer;
  flex-shrink: 0;
  white-space: nowrap;
  margin-right: clamp(12px, 10vw, 16px);
}

.follow-btn.followed {
  background: rgba(44, 53, 47, 0.1);
  color: rgba(44, 53, 47, 0.4);
  min-width: 45px;
}

.share-icon {
  width: clamp(20px, 6vw, 24px);
  height: clamp(20px, 6vw, 24px);
  cursor: pointer;
  flex-shrink: 0;
}
</style>
