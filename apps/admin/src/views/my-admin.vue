<template>
  <div class="content">
    <img class="logo" src="../static/logo.png" alt="logo" />
    <div class="text-area">
      <button @click="count++">点击次数: {{ count }}</button>
    </div>
  </div>
</template>

<script setup lang="ts" name="myAdmin">
import { ref } from 'vue'

const count = ref(0)
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.logo {
  height: 200px;
  width: 200px;
  margin-top: 200px;
  margin-bottom: 50px;
}

.text-area {
  display: flex;
  justify-content: center;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
