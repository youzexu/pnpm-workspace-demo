<template>
  <div class="user-detail-page">
    <!-- 用户信息区域 -->
    <div class="user-header">
      <img class="back-icon" src="@/icons/user-details/back.png" @click="goBack" />
      <div class="user-info">
        <div class="user-left">
          <img class="user-avatar" :src="userData.avatar" alt="头像" />
          <span class="user-name">{{ userData.name }}</span>
        </div>
        <button class="follow-btn" :class="{ followed: userData.isFollowed }" @click="toggleFollow">
          {{ userData.isFollowed ? '已关注' : '关注' }}
        </button>
      </div>
      <img class="share-icon" src="@/icons/user-details/follow.png" @click="handleShare" />
    </div>

    <!-- 背景图片区域 -->
    <div class="bg-image-area">
      <div class="bg-image" :style="{ backgroundImage: `url(${userData.bgImage})` }"></div>
      <div class="bg-overlay"></div>
    </div>

    <!-- 个人简介区域 -->
    <div class="description-area">
      <div class="description-content">
        <h3 class="bio-title">{{ userData.title }}</h3>
        <p class="bio-text">{{ userData.bio || '这个人很懒，什么都没写~' }}</p>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-input-container">
      <div class="input-wrapper">
        <img class="input-icon" src="@/icons/user-details/notes.png" alt="笔" />
        <input
          type="text"
          class="comment-input"
          placeholder="说点什么吧..."
          v-model="commentText"
          @keyup.enter="submitComment"
        />
      </div>
      <div class="action-icons">
        <!-- 点赞 -->
        <div class="action-item">
          <img class="action-icon" :src="isLiked ? likeActiveIcon : likeIcon" @click="toggleLike" />
          <span class="action-count">{{ userData.likes || 0 }}</span>
        </div>

        <!-- 收藏 -->
        <div class="action-item">
          <img
            class="action-icon"
            :src="isCollected ? collectActiveIcon : collectIcon"
            @click="toggleCollect"
          />
          <span class="action-count">{{ userData.collects || 0 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 收藏图标
import collectIcon from '@/icons/user-details/collect.png'
import collectActiveIcon from '@/icons/user-details/collect1.png'
// 点赞图标
import likeIcon from '@/icons/user-details/like.png'
import likeActiveIcon from '@/icons/user-details/like1.png'

const route = useRoute()
const router = useRouter()

const userData = ref({
  id: 0,
  name: '',
  avatar: '',
  bgImage: '',
  title: '',
  bio: '',
  likes: 0,
  collects: 0,
  isFollowed: false
})

const commentText = ref('')
const isCollected = ref(false)
const isLiked = ref(false)

// 获取 query 参数
const getQueryData = () => {
  const data = route.query.data
  return Array.isArray(data) ? data[0] : data || ''
}

// 解析传递的数据
const initData = () => {
  const dataStr = getQueryData()

  if (dataStr) {
    try {
      const item = JSON.parse(decodeURIComponent(dataStr))
      console.log('解析后的数据:', item)
      userData.value = {
        id: item.author?.id || item.id,
        name: item.author?.name || '用户名',
        avatar: item.author?.avatar || 'https://picsum.photos/100/100?random=1',
        bgImage: item.image,
        title: item.title || '标题',
        bio: item.description || '这个人很懒，什么都没写~',
        likes: item.likes || 0,
        collects: item.collects || 0,
        isFollowed: false
      }
    } catch (error) {
      console.error('解析失败:', error)
    }
  } else {
    console.error('数据解析失败')
  }
}

// 返回上一页
const goBack = () => router.back()

// 切换收藏
const toggleCollect = () => {
  isCollected.value = !isCollected.value
  userData.value.collects = isCollected.value
    ? userData.value.collects + 1
    : userData.value.collects - 1
}

// 切换点赞
const toggleLike = () => {
  isLiked.value = !isLiked.value
  userData.value.likes = isLiked.value ? userData.value.likes + 1 : userData.value.likes - 1
}

// 切换关注
const toggleFollow = () => {
  userData.value.isFollowed = !userData.value.isFollowed
}

// 分享
const handleShare = () => console.log('分享')

// 提交评论
const submitComment = () => {
  if (commentText.value.trim()) {
    console.log('发表评论:', commentText.value)
    commentText.value = ''
  }
}

onMounted(() => {
  initData()
})
</script>
<style scoped>
/* ==================== 头部样式 ==================== */
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
  min-width: 0; /* 允许收缩 */
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

/* 关注按钮 */
.follow-btn {
  width: clamp(36px, 12vw, 40px);
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

/* 已关注状态 */
.follow-btn.followed {
  background: rgba(44, 53, 47, 0.1);
  color: rgba(44, 53, 47, 0.4);
}

.share-icon {
  width: clamp(20px, 6vw, 24px);
  height: clamp(20px, 6vw, 24px);
  cursor: pointer;
  flex-shrink: 0;
}

/* ==================== 背景图片样式 ==================== */
.bg-image-area {
  position: relative;
  width: 100%;
  max-width: 375px;
  height: clamp(400px, 50vh, 500px);
  margin: 0 auto;
  overflow: hidden;
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

/* 渐变遮罩层 */
.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5));
}

/* ==================== 个人简介样式 ==================== */
.description-area {
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 5;
}

.description-content {
  padding: 20px 16px;
  max-height: 266px;
  overflow-y: auto;
}

/* ==================== 底部操作栏样式 ==================== */
.bottom-input-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 375px;
  height: 48px;
  background: #fff;
  margin: 0 auto;
  z-index: 100;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 16px;
  box-sizing: border-box;
}

/* 输入框容器 */
.input-wrapper {
  position: relative;
  flex: 1;
  min-width: 0;
  max-width: 260px;
  height: 40px;
  background: #f5f5f5;
  border-radius: 20px;
}

/* 左侧图标 */
.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 2;
}

/* 评论输入框 */
.comment-input {
  width: 100%;
  height: 100%;
  padding: 0 16px 0 40px;
  background: transparent;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  color: #262e29;
  outline: none;
  box-sizing: border-box;
}

.comment-input::placeholder {
  color: rgba(44, 53, 47, 0.4);
}

/* 右侧操作按钮组 */
.action-icons {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-shrink: 0;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  min-width: 32px;
}

.action-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.action-count {
  font-family:
    PingFang SC,
    -apple-system,
    sans-serif;
  font-size: 10px;
  font-weight: normal;
  line-height: 16px;
  text-align: center;
  color: #262e29;
}

/* ==================== 响应式适配 ==================== */
@media (max-width: 350px) {
  .bottom-input-container {
    padding: 0 12px;
    gap: 8px;
  }
  .input-wrapper {
    max-width: 200px;
  }
  .action-icons {
    gap: 10px;
  }
  .action-item {
    min-width: 28px;
  }
}

/* 超小屏幕 */
@media (max-width: 320px) {
  .input-wrapper {
    max-width: 170px;
  }
  .action-icons {
    gap: 8px;
  }
  .action-item {
    min-width: 24px;
  }
}
</style>
