<!-- 侧边栏 -->
<template>
  <!-- 遮罩层 -->
  <div class="drawer-overlay" :class="{ show: isOpen }" @click="closeDrawer"></div>
  
  <div class="drawer" :class="{ open: isOpen }">
    <div class="drawer-menu" @click="router.push('/drafts')">
      <img class="drawer-icon" src="@/icons/home/draft.png" />
      <span class="drawer-text">草稿箱</span>
    </div>
    <div class="drawer-menu" @click="router.push('/settings')">
      <img class="drawer-icon" src="@/icons/home/content.png" />
      <span class="drawer-text">设置</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  isOpen: boolean
}>()

const router = useRouter()
const emit = defineEmits(['close'])

// 关闭侧边栏
const closeDrawer = () => {
  emit('close')
}
</script>

<style scoped>
/* 遮罩层 */
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
}

.drawer-overlay.show {
  opacity: 1;
  visibility: visible;
}

/* 侧边栏容器 - Flex 列布局 */
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background: #ffffff;
  box-shadow: 2px 0 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 40px 12px 0;
}

/* 打开状态 */
.drawer.open {
  transform: translateX(0);
}

/* 菜单项 */
.drawer-menu {
  display: flex;
  align-items: center;
  height: 48px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.drawer-menu:hover {
  background: #f5f5f5;
}

/* 图标 */
.drawer-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}

/* 文字 */
.drawer-text {
  font-size: 14px;
  font-weight: 600;
  color: #262e29;
}
</style>