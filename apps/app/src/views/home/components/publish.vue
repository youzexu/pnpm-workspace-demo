<template>
  <!-- 遮罩层 -->
  <div class="publish-overlay" :class="{ show: isOpen }" @click="closePublish"></div>

  <!-- 发布弹窗 -->
  <div class="publish" :class="{ open: isOpen }">
    <div class="publish-content">
      <div class="image-row">
        <img class="publish-notespng" src="@/icons/home/home-publish/notes.png" />
        <img class="publish-collectionpng" src="@/icons/home/home-publish/collection.png" />
      </div>
    </div>
    <div class="publish-footer">
      <button class="close-btn" @click="closePublish">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const closePublish = () => {
  emit('close')
}
</script>

<style scoped>
/* 遮罩层 */
.publish-overlay {
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

.publish-overlay.show {
  opacity: 1;
  visibility: visible;
}

/* 发布弹窗 */
.publish {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 375px;
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px 20px 0 0;
  z-index: 1000;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.publish.open {
  transform: translateY(0);
}

/* 内容区域 */
.publish-content {
  padding: 20px 16px;
}

/* 图片行 */
.image-row {
  display: flex;
  justify-content: space-between;
  gap: 11px;
}

/* 图片样式 */
.publish-notespng,
.publish-collectionpng {
  flex: 1;
  width: 0;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
}

/* 底部按钮区域 */
.publish-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0 20px 0;
}

/* X 关闭按钮 */
.close-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #f7f7f7;
  border-radius: 28px;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.close-btn:hover {
  background: #e8e8e8;
  color: #666;
}

.close-btn:active {
  transform: scale(0.95);
}
</style>
