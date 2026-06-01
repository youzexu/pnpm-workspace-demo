<!-- src/views/knowledge-base/knowledge-base.vue -->
<template>
  <div>
    <!-- 消息内容 -->
    <div class="knowledge-container">
      <h1>消息</h1>
    </div>
    <Bottom />
  </div>
</template>

<script setup>
import Bottom from '@/layout/bottom-bar.vue'
</script>

<style scoped>
.knowledge-container {
  padding: 20px;
  margin-bottom: 60px; /* 避免被底部栏遮挡 */
}
</style>
