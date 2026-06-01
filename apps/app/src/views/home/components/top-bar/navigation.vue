<!-- 顶部导航栏 -->
<template>
  <div class="navigationBar">
    <img class="sidepng" src="@/icons/home/side.png" @click="openDrawer" />
    <div class="navigationBarContent">
      <div
        v-for="(item, index) in tabs"
        :key="index"
        class="tab-item"
        :class="{ active: selected === index }"
        @click="selected = index"
      >
        <div class="tab-text-wrapper">
          <div class="tab-text">{{ item.name }}</div>
          <img v-if="selected === index" class="tab-indicator" src="@/icons/home/leaf.png" />
        </div>
      </div>
    </div>
    <img class="discoverpng" src="@/icons/home/discover.png" @click="goToSearch" />
  </div>
  <!-- 侧边栏 -->
  <Drawer :isOpen="isDrawerOpen" @close="closeDrawer" />
</template>

<script setup lang="ts">
import Drawer from './drawer.vue' 
import { useRouter } from 'vue-router'
import { ref } from 'vue'
// 路由实例
const router = useRouter()
// 侧边栏展开/收起状态
const isDrawerOpen = ref(false)
// 导航栏选项
const selected = ref(0)
// 定义导航栏选项数组
const tabs = [{ name: '发现' }, { name: '关注' }, { name: '话题' }]
// 跳转到搜索页面
const goToSearch = () => {
  router.push('/search')
}
// 打开侧边栏函数
const openDrawer = () => {
  isDrawerOpen.value = true
}
// 关闭侧边栏函数
const closeDrawer = () => {
  isDrawerOpen.value = false
}
</script>

<style scoped>
/* 导航栏样式 */
.navigationBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 375px;
  height: 50px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px;
  box-sizing: border-box;
  z-index: 100;
}

.discoverpng,
.sidepng {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.navigationBarContent {
  display: flex;
  gap: 24px;
}

.tab-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.tab-text-wrapper {
  position: relative;
  display: inline-block;
}

.tab-text {
  font-family: PingFang SC;
  font-size: 16px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0px;
  font-variation-settings: 'opsz' auto;
  color: rgba(44, 53, 47, 0.6);
  transition: all 0.3s;
  position: relative;
  transition: color 0.5s;
  z-index: 2;
}

.tab-item.active .tab-text {
  font-size: 16px;
  line-height: 26px;
  color: #262e29;
}

.tab-indicator {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
  width: 18.8px;
  height: 28.71px;
  background: linear-gradient(222deg, #4ef9a1 25%, rgba(78, 249, 161, 0) 97%);
  border-radius: 50%; 
  pointer-events: none;
}
</style>
