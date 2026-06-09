<!-- 背景图片区域组件 -->
<template>
  <div class="bg-image-area">
    <div class="bg-image" :style="{ backgroundImage: `url(${bgImage})` }"></div>
    <div class="bg-overlay"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  bgImage: string
}>()
</script>

<style scoped>
/* 背景图片区域  */
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

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5));
}
</style>
