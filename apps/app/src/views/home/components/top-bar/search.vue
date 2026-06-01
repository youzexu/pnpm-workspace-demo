<!-- 搜索组件 -->
<template>
  <div class="search-container">
    <div class="search-header">
      <img
        class="search-searchpng"
        @click="$router.back()"
        src="@/icons/home/home-search/search.png"
      />
      <div class="search-input-wrapper">
        <input type="text" placeholder="搜索点啥呢..." />
      </div>
      <span class="search-text">搜索</span>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.search-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 375px;
  height: 100%;
  background: white;
  z-index: 200;
}

.search-header {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 375px;
  height: 50px;
  background: white;
  padding: 0 16px;
  box-sizing: border-box;
}

.search-input-wrapper {
  flex: 1;
}

.search-input-wrapper input {
  width: 100%;
  height: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  background: #f5f5f5;
  padding: 0 12px;
  box-sizing: border-box;
}

.search-searchpng {
  width: 24px;
  height: 24px;
  cursor: pointer;
  flex-shrink: 0;
}

.search-text {
  font-size: 14px;
  color: #37d081;
  cursor: pointer;
  flex-shrink: 0;
}
</style>
