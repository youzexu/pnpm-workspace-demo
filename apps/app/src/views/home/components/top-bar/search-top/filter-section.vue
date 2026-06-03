<!-- 筛选部分 -->
<template>
  <div class="search-filter">
    <div class="search-filter-list">
      <div
        v-for="item in searchFilters"
        :key="item.id"
        class="search-filter-item"
        :class="{ active: activeFilter === item.id }"
        @click="handleFilterClick(item)"
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
import { useRouter } from 'vue-router'
interface SearchFilter {
  name: string
  id: number
  path: string
}

const router = useRouter()
const activeFilter = ref(1)
const searchFilters = [
  { name: '作品', id: 1, path: '/search/collection' },
  { name: '用户', id: 2, path: '/search/users' }
]

const handleFilterClick = (item: SearchFilter) => {
  activeFilter.value = item.id
  router.push(item.path)
}
</script>
<style scoped>
/* 筛选容器 */
.search-filter {
  background: white;
}
/* 筛选列表  */
.search-filter-list {
  display: flex;
  gap: clamp(16px, 6vw, 24px);
  padding: 10px clamp(12px, 4vw, 16px);
}
/* 筛选项 */
.search-filter-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding-bottom: 8px;
}
/* 筛选文字 */
.filter-name {
  font-size: clamp(14px, 4vw, 16px);
  font-weight: 600;
  line-height: 26px;
  color: rgba(44, 53, 47, 0.6);
  white-space: nowrap;
  transition: all 0.3s;
  z-index: 2;
}
/* 激活状态文字 */
.search-filter-item.active .filter-name {
  font-size: clamp(16px, 5vw, 18px);
  line-height: 30px;
  color: #262e29;
}
/* 激活 */
.filter-indicator {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(35px, 12vw, 45px);
  height: clamp(22px, 7vw, 28px);
  object-fit: contain;
  pointer-events: none;
  z-index: 1;
}
/* 小屏幕适配 */
@media (max-width: 350px) {
  .search-filter-list {
    gap: 12px;
  }
  .filter-name {
    font-size: 13px;
  }
  .search-filter-item.active .filter-name {
    font-size: 15px;
  }
}
</style>
