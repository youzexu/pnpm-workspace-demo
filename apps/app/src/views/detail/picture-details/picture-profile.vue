<!-- 描述区域组件 -->
<template>
  <div class="description-area">
    <div class="description-content">
      <h3 class="bio-title">{{ title }}</h3>
      <p class="bio-text">{{ description || '这个人很懒，什么都没写~' }}</p>
      <div class="time-info" v-if="createdAt">
        <span class="time-label">编辑于:</span>
        <span class="time-value">{{ formatDate(createdAt) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  createdAt: string
}>()
// 格式化日期函数
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}
</script>

<style scoped>
/* 样式定义 */
.description-area {
  position: relative;
  width: 100%;
  max-width: 375px;
  margin: -20px auto 0;
  background: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 5;
}

.description-content {
  padding: 20px 16px;
  max-height: 266px;
  overflow-y: auto;
  background: #fff;
  border-radius: 16px 16px 0 0;
}

/* 标题字体样式 */
.bio-title {
  font-size: 16px;
  font-weight: 600;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #262e29;
  margin-bottom: 8px;
  line-height: 1.4;
}

/* 正文字体样式 */
.bio-text {
  font-size: 14px;
  font-weight: 400;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #666;
  line-height: 1.5;
  word-break: break-word;
}

/* 时间信息字体样式 */
.time-info {
  margin-top: 16px;
  padding-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #999;
}

.time-label {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
}

.time-value {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  color: #666;
}
</style>
