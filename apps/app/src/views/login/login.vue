<template>
  <div class="login-container">
    <!-- Logo 区域 -->
    <div class="logo">
      <img src="@/icons/login/logo.png" alt="logo" />
    </div>

    <!-- 登录区域 -->
    <div class="login">
      <template v-if="loginMode === 'default'">
        <button class="login-btn wechat" @click="handleCheckboxChange">
          <img class="icons" src="@/icons/login/image.png" />
          微信登录
        </button>
        <button class="login-btn phone" @click="handleOnelogin">
          <img class="icons" src="@/icons/login/image1.png" />
          一键登录
        </button>
      </template>
      <!-- 手机登录区域 -->
      <template v-else-if="loginMode === 'phone' && !showBindDialog">
        <div class="phone-number">{{ userInformation.number }}</div>
        <button
          class="login-btn"
          style="color: #ffffff; background: #262e29"
          @click="handlePhoneNumberLogin"
        >
          本机号码一键登录
        </button>
      </template>
      <!-- 手机号密码登录方式（点击钥匙图标后显示） -->
      <template v-else-if="loginMode === 'password'">
        <form class="phone-login-form" @submit.prevent="handleLogin">
          <input
            autocomplete="username"
            class="phone-input"
            type="tel"
            placeholder="手机号"
            v-model="userInformation.number"
          />
          <input
            autocomplete="current-password"
            class="password-input"
            type="password"
            placeholder="密码"
            v-model="userInformation.password"
          />
          <button class="login-btn phone-pwd-login" type="submit">登录</button>
        </form>
      </template>
      <!-- 同意条款 -->
      <label class="agree-terms">
        <input type="checkbox" v-model="agreed" class="round-checkbox" />
        <span>
          我已阅读并同意
          <a href="/terms" target="_blank">《服务条款》</a>
          .
          <a href="/privacy" target="_blank">《隐私政策》</a>
        </span>
      </label>
      <div class="social-media">
        <div v-if="loginMode !== 'default'">
          <img class="weChat" src="@/icons/login/image4.png" @click="handleAppleLogin" />
        </div>
        <div v-if="loginMode !== 'phone' && !showBindDialog">
          <img class="phone1" src="@/icons/login/image1.png" @click="handlePhoneNumber" />
        </div>
        <img class="apple" src="@/icons/login/image2.png" @click="handleAppleLogin" />
        <div v-if="loginMode !== 'password'">
          <img class="key" src="@/icons/login/image3.png" @click="handlePasswordLogin" />
        </div>
      </div>
    </div>

    <!-- 手机号绑定弹窗 -->
    <div v-if="showBindDialog" class="dialog-overlay" @click.self="showBindDialog = false">
      <div class="bind-dialog-container">
        <div class="bind-dialog-title">手机号绑定</div>
        <div class="bind-form">
          <div class="bind-input-group">
            <input
              type="tel"
              placeholder="请输入手机号"
              v-model="VerificationForm.number"
              class="bind-input"
            />
          </div>
          <div class="bind-input-group code-group">
            <div class="code-input-wrapper">
              <input
                type="text"
                placeholder="请输入验证码"
                v-model="VerificationForm.account"
                class="bind-input code-input"
              />
              <button class="send-code-btn" @click="sendCode" :disabled="codeSending">
                {{ codeText }}
              </button>
            </div>
          </div>
        </div>
        <div class="bind-dialog-buttons">
          <button class="bind-dialog-btn cancel" @click="showBindDialog = false">取消</button>
          <button class="bind-dialog-btn confirm" @click="handleBindConfirm">确定</button>
        </div>
      </div>
    </div>

    <!-- 自定义确认弹窗 -->
    <div v-if="showConfirmDialog" class="dialog-overlay">
      <div class="dialog-container">
        <div class="dialog-title">是否同意并登录</div>
        <div class="dialog-content">
          我已阅读并同意
          <a href="/terms" target="_blank">《服务条款》</a>
          、
          <a href="/privacy" target="_blank">《隐私政策》</a>
        </div>
        <div class="dialog-buttons">
          <button class="dialog-btn no" @click="handleDisagree">否</button>
          <button class="dialog-btn yes" @click="handleConfirmLogin">是</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
// 路由实例
const router = useRouter()
// 条款同意状态
const agreed = ref(false)
// 条款同意弹窗
const showConfirmDialog = ref(false)
// 判断登录的模式
const loginMode = ref<'default' | 'phone' | 'password'>('default')
// 手机号绑定弹窗
const showBindDialog = ref(false)

const codeSending = ref(false)
const codeText = ref('发送')

const VerificationForm = reactive({
  number: '',
  account: ''
})
const userInformation = reactive({
  number: '13251175885',
  account: '1234567890',
  password: '',
  email: '1234567890@qq.com'
})
let countdownTimer: ReturnType<typeof setInterval> | null = null
const clearCountdown = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
}
// 处理发送验证码逻辑
const sendCode = () => {
  // 验证手机号
  if (!VerificationForm.number) {
    alert('请先输入手机号')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(VerificationForm.number)) {
    alert('请输入正确的手机号')
    return
  }
  // 清空倒计时
  clearCountdown()
  // 开始倒计时
  codeSending.value = true
  let seconds = 60

  const timer = setInterval(() => {
    seconds--
    if (seconds <= 0) {
      clearInterval(timer)
      codeText.value = '发送'
      codeSending.value = false
    } else {
      codeText.value = `${seconds}s`
    }
  }, 1000)
}
// 处理手机号绑定按钮点击事件
const handlePhoneNumber = () => {
  showBindDialog.value = true
}
// 处理手机号绑定确认逻辑
const handleBindConfirm = () => {
  // 验证手机号
  if (!VerificationForm.number) {
    alert('请先输入手机号')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(VerificationForm.number)) {
    alert('请输入正确的手机号')
    return
  }
  // 验证验证码
  if (!VerificationForm.account) {
    alert('请输入验证码')
    return
  }

  // 格式化手机号
  const phone = VerificationForm.number
  userInformation.number = `${phone.slice(0, 3)} **** ${phone.slice(-4)}`

  // 切换到手机登录模式
  loginMode.value = 'phone'

  // 关闭弹窗
  showBindDialog.value = false
  clearCountdown()

  // 清空表单
  VerificationForm.number = ''
  VerificationForm.account = ''

  console.log('绑定成功')
}
// 处理组件卸载时清除倒计时
onUnmounted(() => {
  clearCountdown()
})
// 处理账号密码登录逻辑
const handleLogin = () => {
  // 验证手机号
  if (!userInformation.number) {
    alert('请先输入手机号')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(userInformation.number)) {
    alert('请输入正确的手机号')
    return
  }
  // 验证密码
  if (!userInformation.password) {
    alert('请先输入密码')
    return
  }
  handleCheckboxChange()
}
// 处理苹果登录按钮点击事件
const handleAppleLogin = () => {
  loginMode.value = 'default'
}
// 处理一键登录逻辑
const handleOnelogin = () => {
  showBindDialog.value = true
}
// 处理密码登录按钮点击事件
const handlePasswordLogin = () => {
  loginMode.value = 'password'
  console.log('用户点击密码登录')
}
// 处理手机号一键登录按钮点击事件
const handlePhoneNumberLogin = () => {
  if (!agreed.value) {
    showConfirmDialog.value = true
  } else {
    handleConfirmLogin()
  }
}
// 处理微信登录按钮点击事件
const handleCheckboxChange = () => {
  if (!agreed.value) {
    showConfirmDialog.value = true
  } else {
    handleConfirmLogin()
  }
}
// 处理确认登录逻辑
const handleConfirmLogin = () => {
  agreed.value = true
  console.log('用户同意并登录')
  showConfirmDialog.value = false
  router.push('/home')
}
// 处理不同意逻辑
const handleDisagree = () => {
  agreed.value = false
  showConfirmDialog.value = false
}
</script>

<style scoped>
/* 整体容器 */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 375px;
  height: 812px;
  background: white;
}

/* Logo 区域 */
.logo {
  margin-top: 156px;
  margin-bottom: 172px;
}

.logo img {
  width: 120px;
  height: auto;
  object-fit: cover;
}

/* 登录区域 */
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 280px;
}

/* 登录按钮 */
.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 295px;
  height: 50px;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

/* 微信登录按钮 */
.login-btn.wechat {
  background: #262e29;
  color: #ffffff;
}

.login-btn.wechat:hover {
  background: #262e29;
}

/* 一键登录按钮 */
.login-btn.phone {
  margin-top: 16px;
  background: #f5f5f5;
  color: #262e29;
}

.login-btn.phone:hover {
  background: #f5f5f5;
}
.icons {
  width: 24px;
  height: 24px;
}

/* 同意条款 */
.agree-terms {
  height: 20px;
  margin-top: 16px;
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.agree-terms input {
  width: 12px;
  height: 12px;
  margin: 0;
  cursor: pointer;
  box-sizing: border-box;
}

.agree-terms a {
  color: #37d081;
  text-decoration: none;
}

.agree-terms a:hover {
  text-decoration: underline;
}
/* 圆形复选框样式 */
.round-checkbox {
  width: 14px;
  height: 14px;
  margin: 0;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  border: 1px solid rgba(44, 53, 47, 0.8);
  border-radius: 50%;
  background-color: white;
  transition: all 0.2s;
  position: relative;
  flex-shrink: 0;
}

/* 选中状态 */
.round-checkbox:checked {
  background-color: #37d081;
  border-color: #37d081;
}

/* 选中时显示圆点 */
.round-checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 10px;
  font-weight: bold;
}

/* 悬停效果 */
.round-checkbox:hover {
  border-color: #37d081;
}
/* 社交媒体图标 */
.social-media {
  margin-bottom: 87px;
  margin-top: 49px;
  display: flex;
  justify-content: center;
  gap: 36px;
}

.key,
.apple,
.weChat,
.phone1 {
  height: 16px;
  width: 16px;
  box-sizing: border-box;
  border: 1px solid rgba(44, 53, 47, 0.8);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: white;
  padding: 2px;
}

.key:hover,
.apple:hover,
.weChat:hover,
.phone1:hover {
  opacity: 0.7;
}

/* 弹窗遮罩层 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* 弹窗容器 */
.dialog-container {
  width: 320px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* 弹窗标题 */
.dialog-title {
  font-size: 20px;
  font-weight: bold;
  padding: 32px 20px 16px;
  color: #1a1a1a;
}

/* 弹窗内容 */
.dialog-content {
  font-size: 14px;
  color: #666;
  padding: 0 28px 32px;
  line-height: 1.5;
}

.dialog-content a {
  color: #37d081;
  text-decoration: none;
}

/* 按钮区域 */
.dialog-buttons {
  display: flex;
  border-top: 1px solid #e5e5e5;
}

.dialog-btn {
  flex: 1;
  padding: 16px;
  font-size: 16px;
  border: none;
  background: white;
  cursor: pointer;
  transition: background 0.2s;
}

.dialog-btn.no {
  color: #999;
  border-right: 1px solid #e5e5e5;
}

.dialog-btn.no:hover {
  background: #fafafa;
}

.dialog-btn.yes {
  color: #37d081;
  font-weight: 600;
}

.dialog-btn.yes:hover {
  background: #f0faf5;
}
/* 手机号码区域 */
.phone-number {
  font-family: D-DIN;
  font-size: 24px;
  font-weight: bold;
  line-height: normal;
  text-align: center;
  letter-spacing: 0px;
}
.phone-login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
}

/* 手机号输入框 */
.phone-input,
.password-input {
  margin-bottom: 16px;
  width: 295px;
  height: 56px;
  padding: 0 16px;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  background: #f5f5f5;
}

/* 输入框聚焦效果 */
.phone-input:focus,
.password-input:focus {
  outline: none;
}

/* 登录按钮 */
.login-btn.phone-pwd-login {
  width: 295px;
  height: 50px;
  background: #262e29;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn.phone-pwd-login:hover {
  background: #1a211d;
}

/* 手机号绑定弹窗容器 */
.bind-dialog-container {
  width: 279px;
  height: 246px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 弹窗标题 */
.bind-dialog-title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 16px;
  color: #1a1a1a;
  flex-shrink: 0;
}

/* 表单区域 */
.bind-form {
  padding: 0 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 输入框组 */
.bind-input-group {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.bind-input-group:last-child {
  margin-bottom: 0;
}

/* 普通输入框 */
.bind-input {
  width: 247px;
  height: 48px;
  border-radius: 4px;
  padding: 0 16px;
  font-size: 14px;
  border: none;
  box-sizing: border-box;
  background: #f5f5f5;
}

.bind-input:focus {
  outline: none;
  border-color: #37d081;
}

/* 验证码输入框容器 */
.code-input-wrapper {
  position: relative;
  width: 247px;
}

/* 验证码输入框 */
.code-input {
  width: 247px;
  height: 48px;
  padding-right: 80px !important;
  border-radius: 4px;
  font-size: 14px;
  border: none;
  box-sizing: border-box;
  background: #f5f5f5;
}

/* 发送验证码按钮 - 绝对定位在输入框内部右侧 */
.send-code-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 22px;
  background: transparent;
  border: none;
  font-size: 12px;
  color: #37d081;
  cursor: pointer;
  white-space: nowrap;
  z-index: 1;
}

.send-code-btn:disabled {
  color: #37d081;
  cursor: not-allowed;
}

/* 按钮区域 */
.bind-dialog-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-shrink: 0;
  margin: 24px 16px 16px 16px;
}

.bind-dialog-btn {
  width: 116px;
  height: 40px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.bind-dialog-btn.cancel {
  color: #262e29;
  background: #f7f7f7;
}

.bind-dialog-btn.confirm {
  background: #30c591;
  color: #ffffff;
}

.bind-dialog-btn.confirm:hover {
  background: #26a878;
}

.bind-dialog-btn.cancel:hover {
  background: #e0dfdf;
}
</style>
