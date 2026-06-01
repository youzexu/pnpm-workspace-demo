<!-- 顶部栏组件2  -->
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
// 导入图标数据
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
  position: fixed;
  left: -7px;
  top: 50px;
  width: 375px;
  background: white;
  z-index: 99;
  transition: transform 0.3s ease;
  transform: translateY(0);
}

.top.hide {
  transform: translateY(-100%);
}

.top-bar {
  padding: 0 8px;
  box-sizing: border-box;
}

.category-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 72px;
  cursor: pointer;
}

.icon-wrapper {
  position: relative;
  margin-bottom: 4px;
}

.category-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.video-badge {
  position: absolute;
  top: -9px;
  right: -15px;
  width: 34px;
  height: 16px;
  border-radius: 4px;
}

.category-name {
  font-family: PingFang SC;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: #3d3d3d;
}

.category-item.active .category-name {
  color: #37d081;
}
</style>
