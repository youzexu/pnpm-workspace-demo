<!-- 评论组件  -->
<template>
  <div class="comments-section">
    <div class="comments-header">
      <span class="comments-title">评论</span>
      <span class="comments-count">{{ totalComments }}</span>
    </div>

    <!-- 评论列表 -->
    <div class="comments-list" ref="commentsListRef">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <img class="comment-avatar" :src="comment.avatar" alt="头像" />
        <div class="comment-content">
          <div class="comment-user">{{ comment.userName }}</div>
          <div class="comment-text">{{ comment.content }}</div>
          <div class="comment-info">
            <span class="comment-time">{{ formatDate(comment.createdAt) }}</span>
            <span class="comment-location">{{ comment.location }}</span>
          </div>
        </div>
        <!-- 点赞图标  -->
        <div class="comment-like-wrapper" @click.stop="toggleCommentLike(comment)">
          <img class="comment-like-icon" :src="comment.isLiked ? likeActiveIcon : likeIcon" />
          <span class="comment-likes">{{ formatNumber(comment.likes) }}</span>
        </div>
      </div>

      <!-- 加载更多 -->
      <div class="load-more-wrapper">
        <div v-if="loading" class="loading-more">
          <div class="loading-spinner"></div>
          <span>加载中...</span>
        </div>
        <div v-else-if="hasMore" class="view-more" @click="loadMore">
          <span>点击查看更多评论</span>
          <svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </div>
        <div v-else-if="comments.length > 0" class="no-more">
          <span class="line"></span>
          <span>没有更多了</span>
          <span class="line"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import likeIcon from '@/icons/user-details/like.png'
import likeActiveIcon from '@/icons/user-details/like1.png'
import type { CommentItem } from '@/utils/mockCommentData'
// 定义 props
defineProps<{
  contentId: number
}>()
// 定义事件发射器
const emit = defineEmits<{
  (e: 'updateLike', commentId: number, isLiked: boolean, likes: number): void
}>()

const comments = ref<CommentItem[]>([])
const totalComments = ref(0)
const hasMore = ref(true)
const loading = ref(false)
const page = ref(1)
const pageSize = 10

// 格式化日期
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

// 格式化数字
const formatNumber = (num: number) => {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}

// 加载评论
const loadComments = async (isLoadMore: boolean = false) => {
  if (loading.value) return
  if (isLoadMore && !hasMore.value) return

  loading.value = true
  try {
    const { fetchMockComments } = await import('@/utils/mockCommentData')
    const res = await fetchMockComments(page.value, pageSize)

    if (res.code === 200) {
      if (isLoadMore) {
        comments.value = [...comments.value, ...res.data.list]
      } else {
        comments.value = res.data.list
      }
      totalComments.value = res.data.total
      hasMore.value = res.data.hasMore

      if (isLoadMore) {
        page.value++
      }
    }
  } catch (error) {
    console.error('加载评论失败:', error)
  } finally {
    loading.value = false
  }
}

// 加载更多
const loadMore = () => {
  if (!loading.value && hasMore.value) {
    page.value++
    loadComments(true)
  }
}

// 评论点赞
const toggleCommentLike = (comment: CommentItem) => {
  comment.isLiked = !comment.isLiked
  comment.likes += comment.isLiked ? 1 : -1
  emit('updateLike', comment.id, comment.isLiked, comment.likes)
}

// 新增评论
const addComment = (newComment: CommentItem) => {
  comments.value.unshift(newComment)
  totalComments.value++
}
// 暴露方法供外部调用
defineExpose({
  addComment,
  loadComments
})
// 加载评论数据
onMounted(() => {
  loadComments()
})
</script>

<style scoped>
.comments-section {
  background: #fff;
  padding: 0 16px;
  margin-top: 12px;
}

.comments-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.comments-title {
  font-size: 16px;
  font-weight: 600;
  color: #262e29;
}

.comments-count {
  font-size: 14px;
  color: #999;
}

/* 评论列表 */
.comments-list {
  max-height: 500px;
  overflow-y: auto;
}

/* 评论项 */
.comment-item {
  display: flex;
  gap: 12px;
  padding: 16px 0;
  position: relative;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
  min-width: 0;
}

.comment-user {
  font-size: 15px;
  font-weight: 600;
  color: #262e29;
  margin-bottom: 6px;
}

.comment-text {
  font-size: 14px;
  color: #3d3d3d;
  line-height: 1.4;
  word-break: break-word;
  margin-bottom: 8px;
}

.comment-info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  color: #999;
}

.comment-location {
  color: #999;
}

/* 点赞区域  */
.comment-like-wrapper {
  position: absolute;
  right: 0;
  bottom: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 20px;
  transition: background-color 0.2s ease;
}

.comment-like-wrapper:active {
  background-color: rgba(55, 208, 129, 0.1);
}

.comment-like-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.comment-like-icon:active {
  transform: scale(1.2);
}

.comment-likes {
  font-size: 11px;
  color: #999;
}

/* 加载更多区域 */
.load-more-wrapper {
  padding: 16px 0;
}

.view-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 0;
  font-size: 14px;
  color: #37d081;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-more:active {
  opacity: 0.7;
}

.arrow-icon {
  transition: transform 0.2s ease;
}

.view-more:active .arrow-icon {
  transform: translateY(2px);
}

.loading-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 0;
  font-size: 13px;
  color: #999;
}

.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid #e0e0e0;
  border-top-color: #37d081;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.no-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 0;
  font-size: 12px;
  color: #ccc;
}

.no-more .line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
}

@media (max-width: 350px) {
  .comment-avatar {
    width: 36px;
    height: 36px;
  }
  .comment-user {
    font-size: 14px;
  }
  .comment-text {
    font-size: 13px;
  }
  .view-more {
    padding: 10px 0;
    font-size: 13px;
  }
  .comment-like-wrapper {
    bottom: 12px;
    padding: 2px 6px;
  }
  .comment-like-icon {
    width: 14px;
    height: 14px;
  }
}
</style>
