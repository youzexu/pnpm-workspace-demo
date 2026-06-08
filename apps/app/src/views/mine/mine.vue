<template>
  <div class="knowledge-page">
    <!-- 内容区域 -->
    <div class="knowledge-container">
      <h1>我的</h1>
      <div v-for="i in 20" :key="i" class="test-item">
        我的内容 {{ i }}
      </div>
    </div>
    
    <!-- 底部栏 -->
    <Bottom />
  </div>
</template>

<script setup>
import Bottom from '@/layout/bottom-bar.vue'
</script>

<style scoped>
/* 页面容器 */
.knowledge-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  background: white;
  overflow: hidden;
}

/* 内容容器  */
.knowledge-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  padding-bottom: 20px;
}

/* 底部栏  */
:deep(.footerNavigationBar) {
  flex-shrink: 0;
  position: relative;
}

.test-item {
  padding: 12px;
  margin-bottom: 8px;
  background: #f5f5f5;
  border-radius: 8px;
}
</style>