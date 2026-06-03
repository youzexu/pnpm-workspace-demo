<!-- 设置 -->
<template>
  <div class="settings-header">
    <img class="return-icon" src="@/icons/home/drawer-divider/return.png" @click="goBack" />
    <p class="settings-title">设置</p>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回上一页
const goBack = () => {
  router.back()
}
</script>

<style scoped>
/* 顶部导航栏  */
.settings-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 50px;
  background: #ffffff;
  margin: 0 auto;
}

/* 返回图标 */
.return-icon {
  position: absolute;
  left: clamp(12px, 4vw, 16px);
  top: 50%;
  transform: translateY(-50%);
  width: clamp(20px, 6vw, 24px);
  height: clamp(20px, 6vw, 24px);
  cursor: pointer;
}

/* 标题  */
.settings-title {
  font-size: clamp(14px, 4vw, 16px);
  font-weight: 500;
  text-align: center;
  color: #3d3d3d;
  margin: 0;
  white-space: nowrap;
}

/* 小屏幕适配 */
@media (max-width: 375px) {
  .settings-header {
    max-width: 100%;
  }
}

/* 横屏适配 */
@media (orientation: landscape) and (max-height: 450px) {
  .settings-header {
    height: 44px;
  }
}
</style>