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
  width: 100%;
  background: white;
  z-index: 10;
}
/* 筛选栏 */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
  background: white;
  padding: 0 clamp(8px, 4vw, 12px);
  gap: clamp(8px, 3vw, 12px);
}
/* 横向滚动区域 */
.filter-row {
  display: flex;
  gap: clamp(6px, 2vw, 8px);
  align-items: center;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
}

.filter-row::-webkit-scrollbar {
  display: none;
}
/* 筛选项 */
.filter-row-item {
  flex-shrink: 0;
  min-width: clamp(48px, 15vw, 56px);
  height: clamp(26px, 7vh, 28px);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px clamp(8px, 3vw, 12px);
  background: #f9f9f9;
  cursor: pointer;
  transition: all 0.3s;
  box-sizing: border-box;
  font-size: clamp(11px, 3.5vw, 12px);
  color: #262e29;
  white-space: nowrap;
}
/* 激活状态 */
.filter-row-item.active {
  color: #37d081;
  background: rgba(55, 208, 129, 0.1);
}
/* 下拉箭头 */
.dropdown-png {
  width: clamp(14px, 4vw, 16px);
  height: clamp(14px, 4vw, 16px);
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.dropdown-png.rotated {
  transform: rotate(180deg);
}

/* 展开内容 */
.filter-expand {
  position: absolute;
  top: 43px;
  left: 0;
  right: 0;
  background: #ffffff;
  padding: clamp(8px, 3vh, 12px);
  z-index: 20;
}
/* 展开行 */
.filter-expand-row {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(6px, 2vw, 8px);
  margin-bottom: clamp(6px, 2vh, 8px);
}

.filter-expand-row:last-child {
  margin-bottom: 0;
}

/* 动画效果 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/* 小屏幕适配 */
@media (max-width: 350px) {
  .filter-row-item {
    min-width: 44px;
    padding: 4px 6px;
  }
  
  .filter-bar {
    gap: 6px;
  }
  
  .filter-row {
    gap: 4px;
  }
}

/* 极窄屏幕 */
@media (max-width: 320px) {
  .filter-row-item {
    min-width: 40px;
    font-size: 10px;
    padding: 4px 4px;
  }
}

/* 横屏模式 */
@media (orientation: landscape) and (max-height: 450px) {
  .filter-bar {
    min-height: 40px;
  }
  
  .filter-row-item {
    height: 24px;
  }
  
  .filter-expand {
    top: 40px;
  }
}
</style>