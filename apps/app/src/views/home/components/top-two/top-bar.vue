<!-- 顶部栏组件2 -->
<template>
  <div class="top">
    <div class="top-bar">
      <div class="category-list">
        <div
          v-for="item in categories"
          :key="item.id"
          class="category-item"
          :class="{ active: activeCategory === item.id }"
          @click="activeCategory = item.id"
        >
          <div class="icon-wrapper">
            <img :src="item.icon" class="category-icon" />
            <!-- 角标 -->
            <img v-if="item.id === 1" class="video-badge" :src="badgePng" />
          </div>
          <span class="category-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 导入图标
import aiPng from '@/icons/home/top-two/ai.png'
import badgePng from '@/icons/home/top-two/badge.png'
import bookPng from '@/icons/home/top-two/book.png'
import knowledgePng from '@/icons/home/top-two/knowledge.png'
import likePng from '@/icons/home/top-two/like.png'
import videoPng from '@/icons/home/top-two/video.png'

// 当前激活的分类ID
const activeCategory = ref(1)

// 分类数据
const categories = [
  { id: 1, name: '同好会', icon: likePng },
  { id: 2, name: '知芽AI', icon: aiPng },
  { id: 3, name: '知识库', icon: knowledgePng },
  { id: 4, name: '盆景书刊', icon: bookPng },
  { id: 5, name: '技术视频', icon: videoPng }
]
</script>

<style scoped>
.top {
  width: 100%;
  background: white;
}

.top-bar {
  padding: 0 clamp(8px, 4vw, 16px);
  box-sizing: border-box;
}

/* 分类列表 - 横向滚动 */
.category-list {
  display: flex;
  gap: clamp(8px, 3vw, 16px);
  align-items: center;
  height: 85px;
  overflow-x: auto;
  scrollbar-width: none;
}

.category-list::-webkit-scrollbar {
  display: none;
}

/* 分类项 */
.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: clamp(55px, 15vw, 72px);
  cursor: pointer;
  transition: transform 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.category-item:active {
  transform: scale(0.95);
}

/* 图标容器 */
.icon-wrapper {
  position: relative;
  margin-bottom: 4px;
}

/* 分类图标 */
.category-icon {
  width: clamp(36px, 10vw, 44px);
  height: clamp(36px, 10vw, 44px);
  border-radius: 50%;
  object-fit: cover;
}

/* 角标 */
.video-badge {
  position: absolute;
  top: -9px;
  right: -15px;
  width: 34px;
  height: 16px;
  border-radius: 4px;
}

/* 分类名称 */
.category-name {
  font-size: clamp(10px, 3vw, 12px);
  font-weight: 500;
  text-align: center;
  color: #3d3d3d;
  white-space: nowrap;
}

/* 激活状态 */
.category-item.active .category-name {
  color: #37d081;
}

/* 小屏幕适配 */
@media (max-width: 350px) {
  .category-list {
    gap: 4px;
  }
  .category-item {
    width: 52px;
  }
  .category-name {
    font-size: 10px;
  }
}
</style>