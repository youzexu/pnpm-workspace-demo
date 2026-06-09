<template>
  <div class="user-detail-page">
    <!-- 用户信息区域 -->
    <PictureHeader :user-data="userHeaderData" @toggle-follow="toggleFollow" />

    <!-- 背景图片区域 -->
    <PictureBackground :bg-image="userData.bgImage" />

    <!-- 个人简介区域 -->
    <PictureProfile
      :title="userData.title"
      :description="userData.description"
      :created-at="userData.createdAt"
    />

    <!-- 评论区 -->
    <PictureComment
      ref="commentsSectionRef"
      :content-id="currentItemId"
      @update-like="handleCommentLike"
    />

    <!-- 底部操作栏 -->
    <pictureBottom
      :likes="userData.likes"
      :collects="userData.collects"
      :is-liked="userData.isLiked"
      :is-collected="userData.isCollected"
      @toggle-like="toggleLike"
      @toggle-collect="toggleCollect"
      @submit-comment="handleSubmitComment"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useLikeStore } from '@/stores/like'
import PictureHeader from './picture-details/picture-header.vue'
import PictureBackground from './picture-details/picture-background.vue'
import PictureProfile from './picture-details/picture-profile.vue'
import PictureComment from './picture-details/picture-comment.vue'
import pictureBottom from './picture-details/picture-bottom.vue'
import type { CommentItem } from '@/utils/mockCommentData'

const route = useRoute()
const userStore = useUserStore()
const likeStore = useLikeStore()

// 组件引用
const commentsSectionRef = ref<InstanceType<typeof PictureComment>>()

// 存储当前内容ID（用于点赞同步）
const currentItemId = ref(0)

const userData = ref({
  id: 0,
  name: '',
  avatar: '',
  bgImage: '',
  title: '',
  description: '',
  likes: 0,
  collects: 0,
  isLiked: false,
  isCollected: false,
  isFollowed: false,
  followStatus: '关注' as '关注' | '已关注' | '互相关注',
  createdAt: '',
  notesCount: 0,
  collectionsCount: 0
})

// 修复：添加 notesCount 和 collectionsCount
const userHeaderData = computed(() => ({
  id: userData.value.id,
  name: userData.value.name,
  avatar: userData.value.avatar,
  isFollowed: userData.value.isFollowed,
  followStatus: userData.value.followStatus,
  notesCount: userData.value.notesCount,
  collectionsCount: userData.value.collectionsCount
}))

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

      const userId = item.author?.id || item.id
      currentItemId.value = item.id

      const cachedStatus = userStore.getFollowStatus(userId)
      const cachedLike = likeStore.getLikeStatus(item.id)

      userData.value = {
        id: userId,
        name: item.author?.name || item.name || '用户名',
        avatar: item.author?.avatar || item.avatar || '',
        isFollowed: cachedStatus.isFollowed,
        followStatus: cachedStatus.followStatus,
        bgImage: item.image || item.bgImage || '',
        title: item.title || '',
        description: item.description || '',
        likes: cachedLike.likes || item.likes || 0,
        collects: item.collects || item.collections || 0,
        isLiked: cachedLike.isLiked || item.isLiked || false,
        isCollected: item.isCollected || false,
        createdAt: item.createdAt || '',
        notesCount: item.author?.notesCount || item.notesCount || 0,
        collectionsCount: item.author?.collectionsCount || item.collectionsCount || 0
      }
    } catch (error) {
      console.error('解析失败:', error)
    }
  } else {
    console.error('数据解析失败')
  }
}

// 切换点赞
const toggleLike = () => {
  userData.value.isLiked = !userData.value.isLiked
  userData.value.likes += userData.value.isLiked ? 1 : -1

  likeStore.setLikeStatus(currentItemId.value, {
    isLiked: userData.value.isLiked,
    likes: userData.value.likes
  })
}

// 切换收藏
const toggleCollect = () => {
  userData.value.isCollected = !userData.value.isCollected
  userData.value.collects += userData.value.isCollected ? 1 : -1
}

// 切换关注
const toggleFollow = () => {
  const newStatus = userStore.toggleFollow(userData.value.id)
  userData.value.isFollowed = newStatus.isFollowed
  userData.value.followStatus = newStatus.followStatus
}

// 处理评论点赞
const handleCommentLike = (commentId: number, isLiked: boolean, likes: number) => {
  console.log('评论点赞:', commentId, isLiked, likes)
}

// 处理提交评论
const handleSubmitComment = (text: string) => {
  console.log('发表评论:', text)

  const newComment: CommentItem = {
    id: Date.now(),
    userName: userData.value.name,
    avatar: userData.value.avatar,
    content: text,
    location: '重庆',
    likes: 0,
    isLiked: false,
    createdAt: new Date().toISOString()
  }

  commentsSectionRef.value?.addComment(newComment)
}
// 初始化数据
onMounted(() => {
  initData()
})
</script>

<style scoped>
.user-detail-page {
  position: relative;
  min-height: 100vh;
  background: #fff;
  padding-bottom: 48px;
  overflow-x: hidden;
}
</style>
