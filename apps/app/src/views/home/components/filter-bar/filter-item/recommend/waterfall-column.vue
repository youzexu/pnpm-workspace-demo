<!-- 瀑布列组件 -->
<template>
  <div
    class="waterfall-column"
    :style="{
      width: `calc(${100 / columnCount}% - ${(gap * (columnCount - 1)) / columnCount}px)`
    }"
  >
    <!-- 瀑布流卡片组件 -->
    <WaterfallCard
      v-for="item in column"
      :key="item.id"
      :item="item"
      @toggle-like="item => emit('toggleLike', item)"
    />
  </div>
</template>

<script lang="ts" setup>
import WaterfallCard from './waterfall-card.vue'
import type { FeedItem } from '@/utils/mockData'
// 定义属性
defineProps<{
  column: FeedItem[]
  columnCount: number
  gap: number
}>()
// 定义事件发射器
const emit = defineEmits<{
  (e: 'toggleLike', item: FeedItem): void
}>()
</script>

<style scoped>
/* 瀑布列样式 */
.waterfall-column {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
