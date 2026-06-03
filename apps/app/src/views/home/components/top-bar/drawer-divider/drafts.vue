<!-- 草稿箱 -->
<template>
  <div class="drafts-container">
    <!-- 顶部导航栏 -->
    <div class="drafts-header">
      <img class="return-icon" src="@/icons/home/drawer-divider/return.png" @click="goBack" />
      <p class="drafts-title">本地草稿</p>
    </div>

    <!-- 提示信息 -->
    <div class="tip-container">
      <div class="tip-content">
        <img class="tip-icon" src="@/icons/home/drawer-divider/attention.png" />
        <span class="tip-text">草稿在应用卸载后会被删除哦</span>
      </div>
    </div>

    <!-- 空状态 -->
    <div class="empty-container">
      <img class="empty-image" src="@/icons/home/drawer-divider/empty.png" />
      <div class="empty-text-group">
        <p class="empty-title">这里空空的</p>
        <p class="empty-desc">还没有草稿</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回上一页
const goBack = () => {
  router.back()
}
</script>

<style scoped>
/* 整体容器 - Flex 列布局 */
.drafts-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: #ffffff;
}

/* ========== 顶部导航栏 ========== */
.drafts-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 50px;
  background: #ffffff;
  flex-shrink: 0;
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

/* 标题 */
.drafts-title {
  font-size: clamp(14px, 4vw, 16px);
  font-weight: 500;
  text-align: center;
  color: #3d3d3d;
  margin: 0;
  white-space: nowrap;
}

/* ========== 提示信息 ========== */
.tip-container {
  background: rgba(55, 208, 129, 0.1);
  padding: 6px 16px;
  margin: 0 0;
  flex-shrink: 0;
}

.tip-content {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tip-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.tip-text {
  font-size: 12px;
  color: #37d081;
  line-height: 1.4;
}

/* ========== 空状态 ========== */
.empty-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
}

.empty-image {
  width: clamp(80px, 25vw, 100px);
  height: clamp(80px, 25vw, 100px);
  margin-bottom: 16px;
}

.empty-title {
  font-size: clamp(14px, 4vw, 16px);
  font-weight: 500;
  color: #262e29;
  margin-bottom: 4px;
}

.empty-desc {
  font-size: clamp(12px, 3.5vw, 14px);
  color: rgba(44, 53, 47, 0.4);
}

/* ========== 小屏幕 ========== */
@media (max-width: 375px) {
  .drafts-container {
    max-width: 100%;
  }
}

/* 横屏适配 */
@media (orientation: landscape) and (max-height: 500px) {
  .drafts-header {
    height: 44px;
  }
  .empty-image {
    width: 60px;
    height: 60px;
  }
}
</style>