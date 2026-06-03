<template>
  <div class="login-container">
    <!-- Logo 区域 -->
    <div class="logo">
      <img src="@/icons/login/logo.png" alt="logo" />
    </div>

    <!-- 登录区域 -->
    <div class="login">
      <LoginForm
        :login-mode="loginMode"
        :phone-number="userInformation.number"
        v-model:phone="userInformation.number"
        v-model:password="userInformation.password"
        @wechat-login="handleCheckboxChange"
        @one-login="handleOnelogin"
        @phone-login="handlePhoneNumberLogin"
        @password-login="handlePasswordLogin"
        @apple-login="handleAppleLogin"
        @show-bind-dialog="handlePhoneNumber"
      />

      <label class="agree-terms">
        <input type="checkbox" v-model="agreed" class="round-checkbox" />
        <span>
          我已阅读并同意
          <a href="/terms" target="_blank">《服务条款》</a>
          <a href="/privacy" target="_blank">《隐私政策》</a>
        </span>
      </label>

      <div class="social-media">
        <div v-if="loginMode !== 'default'">
          <img class="icon" src="@/icons/login/image4.png" @click="handleAppleLogin" />
        </div>
        <div v-if="loginMode !== 'phone'">
          <img class="icon" src="@/icons/login/image1.png" @click="handlePhoneNumber" />
        </div>
        <img class="icon" src="@/icons/login/image2.png" @click="handleAppleLogin" />
        <div v-if="loginMode !== 'password'">
          <img class="icon" src="@/icons/login/image3.png" @click="handleSwitchToPassword" />
        </div>
      </div>
    </div>

    <Dialogs
      v-model:bind-visible="showBindDialog"
      v-model:confirm-visible="showConfirmDialog"
      @bind-confirm="handleBindConfirm"
      @confirm-login="handleConfirmLogin"
      @cancel-login="handleDisagree"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from './components/login-form.vue'
import Dialogs from './components/dialogs.vue'

const router = useRouter()

const agreed = ref(false)
const showConfirmDialog = ref(false)
const loginMode = ref<'default' | 'phone' | 'password'>('default')
const showBindDialog = ref(false)

const userInformation = reactive({
  number: '13251175885',
  password: ''
})

const handleBindConfirm = (phone: string) => {
  userInformation.number = `${phone.slice(0, 3)} **** ${phone.slice(-4)}`
  loginMode.value = 'phone'
  showBindDialog.value = false
}

const handlePhoneNumberLogin = () => {
  if (!agreed.value) {
    showConfirmDialog.value = true
  } else {
    handleConfirmLogin()
  }
}

const handleCheckboxChange = () => {
  if (!agreed.value) {
    showConfirmDialog.value = true
  } else {
    handleConfirmLogin()
  }
}

const handleConfirmLogin = () => {
  agreed.value = true
  showConfirmDialog.value = false
  router.push('/home')
}

const handleDisagree = () => {
  agreed.value = false
  showConfirmDialog.value = false
}

const handleAppleLogin = () => {
  loginMode.value = 'default'
}

const handlePhoneNumber = () => {
  showBindDialog.value = true
}

const handlePasswordLogin = () => {
  if (!userInformation.number) {
    alert('请输入手机号')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(userInformation.number)) {
    alert('请输入正确的手机号')
    return
  }
  if (!userInformation.password) {
    alert('请输入密码')
    return
  }
  if (!agreed.value) {
    showConfirmDialog.value = true
  } else {
    handleConfirmLogin()
  }
}

const handleSwitchToPassword = () => {
  loginMode.value = 'password'
}

const handleOnelogin = () => {
  showBindDialog.value = true
}
</script>

<style scoped>
.login-container {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow-y: auto;
}

.logo {
  width: clamp(60px, 25vw, 120px);
  height: clamp(60px, 25vw, 120px);
  margin-top: clamp(40px, 20vh, 156px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: clamp(20px, 15vh, 120px);
  gap: clamp(12px, 4vh, 20px);
  width: min(280px, 85%);
  flex: 1;
  justify-content: center;
}

.agree-terms {
  display: flex;
  align-items: center;
  gap: clamp(4px, 2vw, 6px);
  cursor: pointer;
  flex-shrink: 0;
}

.social-media {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(24px, 8vw, 36px);
  width: 100%;
  margin-top: clamp(20px, 6vh, 40px);
  margin-bottom: clamp(20px, 6vh, 40px);
  flex-shrink: 0;
}

.round-checkbox {
  width: clamp(10px, 3vw, 12px);
  height: clamp(10px, 3vw, 12px);
  cursor: pointer;
  appearance: none;
  border: 1px solid rgba(44, 53, 47, 0.8);
  border-radius: 50%;
  background: white;
  margin: 0;
  position: relative;
  flex-shrink: 0;
}

.round-checkbox:checked {
  background-color: #37d081;
  border-color: #37d081;
}

.round-checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: clamp(6px, 2vw, 8px);
}

.agree-terms span {
  font-size: clamp(10px, 3vw, 12px);
  color: rgba(44, 53, 47, 0.4);
}

.agree-terms a {
  color: #37d081;
  text-decoration: none;
}

.icon {
  width: clamp(24px, 7vw, 32px);
  height: clamp(24px, 7vw, 32px);
  border-radius: 50%;
  border: 1px solid rgba(44, 53, 47, 0.8);
  background: #ffffff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: clamp(4px, 2vw, 8px);
  -webkit-tap-highlight-color: transparent;
}

.icon:active {
  transform: scale(0.95);
  opacity: 0.7;
}

.icon img {
  width: clamp(12px, 4vw, 16px);
  height: clamp(12px, 4vw, 16px);
  object-fit: contain;
}

/* ========== 小屏幕适配 ========== */
@media (max-height: 700px) {
  .login {
    justify-content: flex-start;
    padding: 15px 0;
  }
  .social-media {
    margin-top: 15px;
    margin-bottom: 20px;
  }
}

@media (max-height: 600px) {
  .logo {
    margin-top: 15px;
    width: 70px;
    height: 70px;
  }
  .login {
    gap: 8px;
    padding: 10px 0;
  }
  .social-media {
    gap: 20px;
    margin-top: 10px;
    margin-bottom: 15px;
  }
}

@media (max-width: 350px) {
  .login {
    width: 90%;
  }
  .social-media {
    gap: 18px;
  }
}

@media (orientation: landscape) and (max-height: 450px) {
  .logo {
    margin-top: 10px;
    width: 50px;
    height: 50px;
  }
  .login {
    gap: 6px;
    padding: 8px 0;
  }
  .social-media {
    margin-top: 8px;
    margin-bottom: 10px;
  }
}
</style>
