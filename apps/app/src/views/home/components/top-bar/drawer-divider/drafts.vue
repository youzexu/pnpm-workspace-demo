<!-- 草稿箱 -->
<template>
  <div>
    <div class="draft-min">
      <img class="return-icon" src="@/icons/home/drawer-divider/return.png" @click="goBack" />
      <p class="draft-title">本地草稿</p>
    </div>

    <!-- 提示名称 -->
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

const goBack = () => {
  router.back()
}
</script>

<style scoped>
/* 通用重置 */
.draft-min,
.tip-container,
.empty-container {
  position: absolute;
  left: 0;
  width: 375px;
}

/* 外层容器 */
.draft-min {
  top: 0;
  height: 50px;
  background: #ffffff;
  display: flex;
  align-items: center;
}

.return-icon {
  position: absolute;
  left: 8px;
  top: 13px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.draft-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: PingFang SC;
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  color: #3d3d3d;
  margin: 0;
  white-space: nowrap;
}

/* 提示区域 */
.tip-container {
  top: 58px;
  height: 28px;
  background: rgba(55, 208, 129, 0.1);
}

.tip-content {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 16px;
}

.tip-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.tip-text {
  font-size: 12px;
  line-height: 20px;
  color: #37d081;
}

/* 空状态 */
.empty-container {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  text-align: center;
}

.empty-image {
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 16px;
  line-height: 26px;
  color: #262e29;
  margin-bottom: 4px;
}

.empty-desc {
  font-size: 14px;
  line-height: 22px;
  color: rgba(44, 53, 47, 0.4);
}
</style>
