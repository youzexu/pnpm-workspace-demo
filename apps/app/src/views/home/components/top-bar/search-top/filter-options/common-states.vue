<template>
  <!-- 加载状态 -->
  <div v-if="type === 'loading'" class="loading-state">
    <div class="loading-spinner"></div>
    <p>加载中...</p>
  </div>

  <!-- 空状态 -->
  <div v-else-if="type === 'empty'" class="empty-state">
    <img src="@/icons/home/home-search/image.png" class="empty-image" />
    <p class="empty-title">这里空空的</p>
    <p class="empty-desc">换个关键词试试吧</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: 'loading' | 'empty'
}>()
</script>

<style scoped>
/* ========== 加载状态 ========== */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #f0f0f0;
  border-top-color: #37d081;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  font-size: 16px;
  font-weight: 500;
  color: #666;
}

/* ========== 空状态 ========== */
.empty-state {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 119px;
  text-align: center;
}

.empty-image {
  width: 100px;
  height: 100px;
  margin: 0 auto 24px;
  display: block;
}

.empty-title {
  font-size: 16px;
  color: #262e29;
  margin-bottom: 4px;
}

.empty-desc {
  font-size: 14px;
  color: rgba(44, 53, 47, 0.4);
}
</style>
