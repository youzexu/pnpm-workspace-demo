<!-- 设置 -->
<template>
  <div></div>
  <div class="draft-min">
    <img class="return-icon" src="@/icons/home/drawer-divider/return.png" @click="goBack" />
    <p class="draft-title">设置</p>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped>
/* 顶部样式 */
.draft-min {
  top: 0;
  height: 50px;
  background: #ffffff;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  width: 375px;
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
</style>
