<template>
  <!-- 默认模式 -->
  <template v-if="loginMode === 'default'">
    <button class="login-btn wechat" @click="emit('wechatLogin')">
      <img class="icons" src="@/icons/login/image.png" />
      微信登录
    </button>
    <button class="login-btn phone" @click="emit('oneLogin')">
      <img class="icons" src="@/icons/login/image1.png" />
      一键登录
    </button>
  </template>

  <!-- 手机号模式 -->
  <template v-else-if="loginMode === 'phone'">
    <div class="phone-number">{{ phoneNumber }}</div>
    <button class="login-btn phone-login-btn" @click="emit('phoneLogin')">本机号码一键登录</button>
  </template>

  <!-- 密码模式 -->
  <template v-else-if="loginMode === 'password'">
    <form class="phone-login-form" @submit.prevent="handleSubmit">
      <input
        type="tel"
        placeholder="手机号"
        :value="phone"
        @input="handlePhoneInput"
        autocomplete="tel"
      />
      <input
        type="password"
        placeholder="密码"
        :value="password"
        @input="handlePasswordInput"
        autocomplete="current-password"
      />
      <button class="login-btn phone-pwd-login" type="submit">登录</button>
    </form>
  </template>
</template>

<script setup lang="ts">
defineProps<{
  loginMode: 'default' | 'phone' | 'password'
  phoneNumber: string
  phone: string
  password: string
}>()

const emit = defineEmits([
  'wechatLogin',
  'oneLogin',
  'passwordLogin',
  'phoneLogin',
  'update:phone',
  'update:password',
  'appleLogin',
  'showBindDialog'
])

const handlePhoneInput = (e: Event) => {
  emit('update:phone', (e.target as HTMLInputElement).value)
}

const handlePasswordInput = (e: Event) => {
  emit('update:password', (e.target as HTMLInputElement).value)
}

const handleSubmit = () => {
  const phoneInput = document.querySelector(
    '.phone-login-form input[type="tel"]'
  ) as HTMLInputElement
  const passwordInput = document.querySelector(
    '.phone-login-form input[type="password"]'
  ) as HTMLInputElement

  const phone = phoneInput?.value || ''
  const password = passwordInput?.value || ''

  if (!phone) {
    alert('请输入手机号')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    alert('请输入正确的手机号（11位数字）')
    return
  }
  if (!password) {
    alert('请输入密码')
    return
  }
  emit('passwordLogin')
}
</script>

<style scoped>
/* ========== 按钮通用样式 ========== */
.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(6px, 2vw, 10px);
  width: 100%;
  max-width: 320px;
  min-width: 200px;
  height: clamp(40px, 10vh, 50px);
  border: none;
  cursor: pointer;
  font-size: clamp(12px, 3.5vw, 16px);
  font-weight: 500;
  margin: 0 auto;
  border-radius: 8px;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.login-btn:active {
  transform: scale(0.98);
  opacity: 0.9;
}

/* 微信登录 */
.login-btn.wechat {
  background: #262e29;
  color: #ffffff;
}

/* 一键登录 */
.login-btn.phone {
  margin-top: clamp(10px, 4vh, 16px);
  background: #f5f5f5;
  color: #262e29;
}

/* 本机号码一键登录 & 密码登录 */
.phone-login-btn,
.phone-pwd-login {
  background: #262e29;
  color: #ffffff;
}

/* 图标 */
.icons {
  width: clamp(16px, 4vw, 24px);
  height: clamp(16px, 4vw, 24px);
  flex-shrink: 0;
}

/* 手机号显示 */
.phone-number {
  font-size: clamp(18px, 5vw, 24px);
  font-weight: 600;
  text-align: center;
  color: #262e29;
  margin-bottom: clamp(6px, 3vh, 16px);
}

/* 表单 */
.phone-login-form {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 3vh, 12px);
  width: 100%;
  align-items: center;
}

/* 输入框 */
.phone-login-form input {
  width: 100%;
  max-width: 320px;
  min-width: 200px;
  height: clamp(44px, 12vh, 56px);
  padding: 0 clamp(12px, 3vw, 16px);
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  font-size: clamp(13px, 3.5vw, 15px);
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.phone-login-form input:focus {
  outline: none;
  background: #efefef;
}

.phone-login-form input::placeholder {
  font-size: clamp(12px, 3vw, 14px);
  color: rgba(44, 53, 47, 0.4);
}

/* ========== 响应式适配 ========== */

/* 小屏幕 */
@media (max-height: 600px) {
  .login-btn {
    height: 38px;
    min-width: 150px;
    font-size: 13px;
  }
  .phone-login-form input {
    height: 40px;
    min-width: 150px;
    font-size: 13px;
  }
  .icons {
    width: 16px;
    height: 16px;
  }
  .phone-number {
    font-size: 18px;
    margin-bottom: 4px;
  }
  .phone-login-form {
    gap: 6px;
  }
  .login-btn.phone {
    margin-top: 6px;
  }
}

/* 超小屏幕 */
@media (max-width: 350px) {
  .login-btn {
    min-width: 130px;
  }
  .phone-login-form input {
    min-width: 130px;
  }
  .phone-number {
    font-size: 16px;
  }
}

/* 横屏 */
@media (orientation: landscape) and (max-height: 450px) {
  .phone-number {
    font-size: 14px;
    margin-bottom: 2px;
  }
  .login-btn {
    height: 32px;
    font-size: 11px;
  }
  .phone-login-form input {
    height: 32px;
    font-size: 11px;
  }
  .icons {
    width: 12px;
    height: 12px;
  }
  .phone-login-form {
    gap: 5px;
  }
}
</style>
