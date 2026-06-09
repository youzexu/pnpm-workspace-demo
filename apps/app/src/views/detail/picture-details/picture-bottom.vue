<!-- 底部操作栏组件 -->
<template>
  <div class="bottom-input-container">
    <!-- 输入框容器 -->
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
    <!-- 点赞收藏 -->
    <div class="action-icons">
      <div class="action-item" @click="toggleLike">
        <img class="action-icon" :src="isLiked ? likeActiveIcon : likeIcon" />
        <span class="action-count">{{ formatNumber(likes) }}</span>
      </div>
      <div class="action-item" @click="toggleCollect">
        <img class="action-icon" :src="isCollected ? collectActiveIcon : collectIcon" />
        <span class="action-count">{{ formatNumber(collects) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import collectIcon from '@/icons/user-details/collect.png'
import collectActiveIcon from '@/icons/user-details/collect1.png'
import likeIcon from '@/icons/user-details/like.png'
import likeActiveIcon from '@/icons/user-details/like1.png'
defineProps<{
  likes: number
  collects: number
  isLiked: boolean
  isCollected: boolean
}>()
// 定义事件发射器
const emit = defineEmits<{
  (e: 'toggleLike'): void
  (e: 'toggleCollect'): void
  (e: 'submitComment', text: string): void
}>()
// 评论输入框文本
const commentText = ref('')
// 格式化数字，千分位分隔符
const formatNumber = (num: number) => {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}
// 点赞按钮
const toggleLike = () => {
  emit('toggleLike')
}
// 收藏按钮
const toggleCollect = () => {
  emit('toggleCollect')
}
// 提交评论
const submitComment = () => {
  if (commentText.value.trim()) {
    emit('submitComment', commentText.value)
    commentText.value = ''
  }
}
</script>

<style scoped>
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
  border-radius: 4px;
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
  gap: 6px;
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
