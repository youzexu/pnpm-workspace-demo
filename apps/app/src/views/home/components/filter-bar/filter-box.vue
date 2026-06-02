<!-- 筛选框 -->
<template>
  <div class="filter-container" :class="{ expanded: isFilterExpanded }">
    <div class="filter-bar">
      <div class="filter-row">
        <div
          v-for="item in defaultFilters"
          :key="item.id"
          class="filter-row-item"
          :class="{ active: currentFilter === item.id }"
          @click="selectFilter(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <img
        class="dropdown-png"
        src="@/icons/home/dropdown.png"
        @click="toggleFilterExpand"
        :class="{ rotated: isFilterExpanded }"
      />
    </div>
    <!-- 展开的更多筛选项 -->
    <transition name="expand">
      <div class="filter-expand" v-if="isFilterExpanded">
        <div class="filter-expand-row" v-for="(row, rowIndex) in filterRows" :key="rowIndex">
          <div
            v-for="item in row"
            :key="item.id"
            class="filter-row-item"
            :class="{ active: currentFilter === item.id }"
            @click="selectFilter(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
interface Tab {
  name: string
  id: number
  path: string
}
const router = useRouter() 
// 当前筛选项的 ID
const currentFilter = ref(1)
// 筛选框展开/收起状态
const isFilterExpanded = ref(false)
// 定义筛选项数组
const allFilters = [
  { name: '推荐', id: 1, path: '/home' },
  { name: '最新', id: 2, path: '/home/latest' },
  { name: '热门', id: 3, path: '/home/popular' },
  { name: '附近', id: 4, path: '/home/nearby' },
  { name: '价格', id: 5, path: '/home/price' },
  { name: '销量', id: 6, path: '/home/sales' },
  { name: '评分', id: 7, path: '/home/rating' },
  { name: '品牌', id: 11, path: '/home/brand' },

]
// 默认显示的5个筛选项
const defaultFilters = computed(() => allFilters.slice(0, 5))
// 展开时显示的更多筛选项（除了前5个）
const moreFilters = computed(() => allFilters.slice(5))
// 每排5个，计算行数
const filterRows = computed(() => {
  const rows = []
  for (let i = 0; i < moreFilters.value.length; i += 5) {
    rows.push(moreFilters.value.slice(i, i + 5))
  }
  return rows
})
// 切换展开/收起
const toggleFilterExpand = () => {
  isFilterExpanded.value = !isFilterExpanded.value
}
// 选择筛选项函数
const selectFilter = (item: Tab) => {
  currentFilter.value = item.id
  router.push(item.path)
}
</script>

<style scoped>
.filter-container {
  position: relative;
  width: 375px;
  background: white;
}

.filter-bar {
  display: flex;
  align-items: center;
  height: 44px;
  background: white;
  padding: 0 8px;
  box-sizing: border-box;
}

.filter-row {
  display: flex;
  gap: 8px;
  align-items: center;
  overflow-x: auto;
}

.filter-row::-webkit-scrollbar {
  display: none;
}

.filter-row-item {
  width: 58px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  background: #f9f9f9;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s;
  box-sizing: border-box;
  font-size: 12px;
  color: #262e29;
}

.filter-row-item.active {
  color: #37d081;
  background: rgba(55, 208, 129, 0.1);
}

.dropdown-png {
  width: 16px;
  height: 16px;
  cursor: pointer;
  flex-shrink: 0;
  margin-left: 11px;
  transition: transform 0.3s ease;
}

.dropdown-png.rotated {
  transform: rotate(180deg);
}

.filter-expand {
  background: white;
  padding: 12px;
}

.filter-expand-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.filter-expand-row:last-child {
  margin-bottom: 0;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>