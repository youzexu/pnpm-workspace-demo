<template>
  <!-- 绑定弹窗 -->
  <div v-if="bindVisible" class="dialog-overlay" @click.self="emit('update:bindVisible', false)">
    <div class="bind-dialog">
      <div class="bind-title">手机号绑定</div>
      <input type="tel" placeholder="请输入手机号" v-model="phone" class="phone-input" />
      <div class="code-wrapper">
        <input type="text" placeholder="请输入验证码" v-model="code" class="code-input" />
        <button @click="sendCode" :disabled="sending" class="send-btn">{{ codeText }}</button>
      </div>
      <div class="bind-buttons">
        <button class="cancel-btn" @click="emit('update:bindVisible', false)">取消</button>
        <button class="confirm-btn" @click="handleBindConfirm">确定</button>
      </div>
    </div>
  </div>

  <!-- 确认弹窗 -->
  <div
    v-if="confirmVisible"
    class="dialog-overlay"
    @click.self="emit('update:confirmVisible', false)"
  >
    <div class="confirm-dialog">
      <div class="confirm-title">是否同意并登录</div>
      <div class="confirm-content">
        我已阅读并同意
        <a href="/terms">《服务条款》</a>
        、
        <a href="/privacy">《隐私政策》</a>
      </div>
      <div class="confirm-buttons">
        <button class="confirm-btn" @click="emit('confirmLogin')">是</button>
        <button class="cancel-btn" @click="emit('cancelLogin')">否</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  bindVisible: boolean
  confirmVisible: boolean
}>()

const emit = defineEmits([
  'update:bindVisible',
  'update:confirmVisible',
  'bindConfirm',
  'confirmLogin',
  'cancelLogin'
])

const phone = ref('')
const code = ref('')
const sending = ref(false)
const codeText = ref('发送')

const sendCode = () => {
  if (!/^1[3-9]\d{9}$/.test(phone.value)) {
    alert('请输入正确的手机号')
    return
  }
  sending.value = true
  let seconds = 60
  const timer = setInterval(() => {
    seconds--
    if (seconds <= 0) {
      clearInterval(timer)
      codeText.value = '发送'
      sending.value = false
    } else {
      codeText.value = `${seconds}s`
    }
  }, 1000)
}

const handleBindConfirm = () => {
  if (!phone.value || !code.value) {
    alert('请填写完整信息')
    return
  }
  emit('bindConfirm', phone.value)
  phone.value = ''
  code.value = ''
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
  box-sizing: border-box;
}

/* ========== 绑定弹窗 ========== */
.bind-dialog,
.confirm-dialog {
  width: min(279px, 90%);
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  max-height: 90vh;
  overflow-y: auto;
}

.bind-title,
.confirm-title {
  font-size: clamp(14px, 4vw, 16px);
  font-weight: 600;
  text-align: center;
  color: #3d3d3d;
  margin-bottom: 16px;
}

.phone-input,
.code-input {
  width: 100%;
  max-width: 247px;
  height: 48px;
  border-radius: 4px;
  background: #f7f7f7;
  border: none;
  padding: 0 12px;
  font-size: clamp(13px, 4vw, 15px);
  color: #262e29;
  box-sizing: border-box;
}

.phone-input {
  margin-bottom: 12px;
  font-weight: 600;
}

.phone-input::placeholder,
.code-input::placeholder {
  font-size: clamp(12px, 3.5vw, 14px);
  font-weight: normal;
  color: rgba(44, 53, 47, 0.4);
}

.code-wrapper {
  position: relative;
  width: 100%;
  max-width: 247px;
  height: 48px;
  margin-bottom: 16px;
}

.code-input {
  padding-right: 70px;
  font-size: clamp(12px, 3.5vw, 14px);
}

.send-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: clamp(12px, 3.5vw, 14px);
  font-weight: 600;
  color: #30c591;
  cursor: pointer;
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.bind-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  width: 100%;
  max-width: 247px;
}

.bind-buttons .cancel-btn,
.bind-buttons .confirm-btn {
  flex: 1;
  height: 40px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: clamp(13px, 4vw, 15px);
  font-weight: 600;
}

.bind-buttons .cancel-btn {
  background: #f7f7f7;
  color: #262e29;
}

.bind-buttons .confirm-btn {
  background: #30c591;
  color: #ffffff;
}

/* ========== 确认弹窗 ========== */
.confirm-dialog {
  padding: 16px 20px;
}

.confirm-content {
  font-size: clamp(12px, 3.5vw, 14px);
  text-align: center;
  color: rgba(44, 53, 47, 0.6);
  margin-bottom: 16px;
}

.confirm-content a {
  color: #37d081;
  text-decoration: none;
}

.confirm-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 247px;
}

.confirm-buttons .confirm-btn {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background: #30c591;
  font-size: clamp(13px, 4vw, 15px);
  font-weight: 600;
  color: #ffffff;
}

.confirm-buttons .cancel-btn {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background: transparent;
  font-size: clamp(13px, 4vw, 15px);
  color: rgba(44, 53, 47, 0.4);
}

/* ========== 小屏幕适配 ========== */
@media (max-height: 600px) {
  .bind-dialog,
  .confirm-dialog {
    padding: 12px;
  }
  .bind-title,
  .confirm-title {
    margin-bottom: 10px;
  }
  .phone-input,
  .code-wrapper {
    margin-bottom: 10px;
  }
  .phone-input,
  .code-input {
    height: 42px;
  }
  .code-wrapper {
    height: 42px;
  }
  .bind-buttons .cancel-btn,
  .bind-buttons .confirm-btn,
  .confirm-buttons .confirm-btn,
  .confirm-buttons .cancel-btn {
    height: 36px;
  }
  .confirm-buttons {
    gap: 8px;
  }
}

@media (max-width: 320px) {
  .bind-dialog,
  .confirm-dialog {
    width: 95%;
    padding: 12px;
  }
  .bind-buttons {
    gap: 10px;
  }
  .send-btn {
    font-size: 12px;
    right: 8px;
  }
  .code-input {
    padding-right: 60px;
  }
}

@media (orientation: landscape) and (max-height: 450px) {
  .bind-dialog,
  .confirm-dialog {
    max-height: 85vh;
  }
  .bind-dialog {
    padding: 10px;
  }
  .phone-input,
  .code-input {
    height: 36px;
  }
  .code-wrapper {
    height: 36px;
  }
  .bind-title,
  .confirm-title {
    margin-bottom: 8px;
  }
}
</style>
