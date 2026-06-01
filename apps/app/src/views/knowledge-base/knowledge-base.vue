<!-- src/views/knowledge-base/knowledge-base.vue -->
<template>
  <div>
    <!-- 知识库内容 -->
    <div class="knowledge-container">
      <h1>知识库</h1>
    </div>
    <Bottom />
  </div>
</template>

<script setup>
import Bottom from '@/layout/bottom-bar.vue'
import { onMounted } from 'vue'

onMounted(() => {
  console.log('知识库页面已加载')
})
</script>

<style scoped>
.knowledge-container {
  padding: 20px;
  margin-bottom: 60px; /* 避免被底部栏遮挡 */
}
</style>
