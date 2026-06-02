  <!-- 侧边栏 -->
<template>
  <!-- 遮罩层 -->
  <div class="drawer-overlay" :class="{ show: isOpen }" @click="closeDrawer"></div>
  <div class="drawer" :class="{ open: isOpen }">
    <div class="drawer-draft" @click="router.push('/drafts')">
      <img class="drawer-draftpng" src="@/icons/home/draft.png" />
      <strong class="drawer-draftname">草稿箱</strong>
    </div>
    <div class="drawer-content" @click="router.push('/settings')">
      <img class="drawer-contentpng" src="@/icons/home/content.png" />
      <strong class="drawer-contentname">设置</strong>
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

/* 侧边栏样式 */
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background: #ffffff;
  box-shadow: 2px 0 16px 0 rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

/* 打开状态 */
.drawer.open {
  transform: translateX(0);
}

.drawer-draft {
  display: flex;
  align-items: center;
  margin-top: 40px;
  width: 176px;
  height: 48px;
}

.drawer-content {
  display: flex;
  align-items: center;
  width: 176px;
  height: 48px;
}

.drawer-draftpng,
.drawer-contentpng {
  padding: 12px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.drawer-draftname,
.drawer-contentname {
  font-family: PingFang SC;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0px;
  color: #262e29;
  cursor: pointer;
}
</style>
