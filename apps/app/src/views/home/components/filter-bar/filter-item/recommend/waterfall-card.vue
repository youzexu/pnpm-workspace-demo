<!-- 瀑布流卡片组件 -->
<template>
  <div class="waterfall-card">
    <!-- 图片区域  -->
    <div
      class="card-image"
      :style="{ aspectRatio: item.imageRatio }"
      @click="goToPictureDetail(item)"
    >
      <img :src="item.image" :alt="item.title" loading="lazy" />
    </div>
    <!-- 内容区域  -->
    <div class="card-content">
      <h3 class="card-title">{{ item.title }}</h3>
      <div class="card-footer">
        <div class="author-info" @click="goToUserDetail(item.author)">
          <img class="author-avatar" :src="item.author.avatar" />
          <span class="author-name">{{ item.author.name }}</span>
        </div>
        <div class="likes-info">
          <img
            class="likes-icon"
            :src="item.isLiked ? likeIcon : notSelectedIcon"
            @click.stop="toggleLike(item)"
          />
          <span class="likes-count">{{ formatNumber(item.likes) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import notSelectedIcon from '@/icons/home/like1.png'
import likeIcon from '@/icons/home/like.png'
import type { FeedItem, UserItem } from '@/utils/mockData'

defineProps<{
  item: FeedItem
}>()
const emit = defineEmits<{
  (e: 'toggleLike', item: FeedItem): void
}>()
// 路由实例
const router = useRouter()
// 格式化点赞数量的函数
const formatNumber = (num: number) => {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}
//  点击图片时的事件处理函数
const goToPictureDetail = (item: FeedItem) => {
  router.push({
    path: `/picture/${item.id}`,
    query: { data: encodeURIComponent(JSON.stringify(item)) }
  })
}
//  点击用户头像时的事件处理函数
const goToUserDetail = (user: UserItem) => {
  router.push({
    path: `/user/${user.id}`,
    query: { userData: encodeURIComponent(JSON.stringify(user)) }
  })
}
//  点击点赞按钮时的事件处理函数
const toggleLike = (item: FeedItem) => {
  emit('toggleLike', item)
}
</script>

<style scoped>
/* 瀑布流卡片样式  */
.waterfall-card {
  background: white;
  border-radius: clamp(6px, 2vw, 8px);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease;
  width: 100%;
}
/* 卡片点击时的缩放效果  */
.waterfall-card:active {
  transform: scale(0.98);
}
/* 卡片样式  */
.card-image {
  position: relative;
  width: 100%;
  background: #f5f5f5;
  overflow: hidden;
}
/* 图片样式  */
.card-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
/* 卡片内容样式  */
.card-content {
  padding: clamp(8px, 3vw, 10px);
}
/* 标题样式  */
.card-title {
  font-size: clamp(12px, 3.5vw, 14px);
  font-weight: 600;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  color: #3d3d3d;
}
/* 底部样式  */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 作者信息样式  */
.author-info {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  flex: 1;
  min-width: 0;
}
/* 作者头像样式  */
.author-avatar {
  width: clamp(16px, 4.5vw, 20px);
  height: clamp(16px, 4.5vw, 20px);
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
/* 作者名称样式  */
.author-name {
  font-size: clamp(9px, 2.5vw, 10px);
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 点赞信息样式  */
.likes-info {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}
/* 点赞图标样式  */
.likes-icon {
  width: clamp(14px, 4vw, 16px);
  height: clamp(14px, 4vw, 16px);
  cursor: pointer;
  transition: transform 0.2s ease;
}
/* 点赞图标点击时的缩放效果  */
.likes-icon:active {
  transform: scale(1.2);
}
/* 点赞数量样式  */
.likes-count {
  font-size: clamp(10px, 3vw, 12px);
  color: #3d3d3d;
}
</style>
