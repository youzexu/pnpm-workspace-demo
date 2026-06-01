<!-- 筛选部分 -->
<template>
  <div class="search-filter">
    <div class="search-filter-list">
      <div
        v-for="item in searchFilters"
        :key="item.id"
        class="search-filter-item"
        :class="{ active: activeFilter === item.id }"
        @click="activeFilter = item.id"
      >
        <span class="filter-name">{{ item.name }}</span>
        <img
          v-if="activeFilter === item.id"
          class="filter-indicator"
          src="@/icons/home/home-search/path.png"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const activeFilter = ref(1)
const searchFilters = [
  { name: '笔记', id: 1 },
  { name: '藏品', id: 2 },
  { name: '用户', id: 3 }
]
</script>
<style scoped>
/* 筛选部分 */
.search-filter {
  background: white;
}

.search-filter-list {
  display: flex;
  gap: 24px;
  padding: 10px 16px;
  position: relative;
}

.search-filter-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  padding-bottom: 8px;
  z-index: 1;
}

.filter-name {
  font-family: PingFang SC;
  font-size: 16px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0px;
  color: rgba(44, 53, 47, 0.6);
  transition: all 0.3s;
  z-index: 2;
}

.search-filter-item.active .filter-name {
  font-size: 18px;
  font-weight: 600;
  line-height: 30px;
  color: #262e29;
}

.filter-indicator {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 45px;
  height: 28px;
  object-fit: contain;
  pointer-events: none;
  z-index: 1;
}
</style>
