<template>
  <div>
    <!-- 头部导航栏 -->
    <HeaderNav />
    <!-- 公告栏 -->
    <Announcement />
    <!-- 登录表单 -->
    <div class="form-container">
      <div class="form-title">登录</div>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">电子邮件地址</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email" 
            @input="validateEmail"
            :class="{ 'is-invalid': emailError }"
            required
          >
          <div v-if="emailError" class="error-message">{{ emailError }}</div>
        </div>
        
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="formData.password" 
            @input="validatePassword"
            :class="{ 'is-invalid': passwordError }"
            required
          >
          <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
        </div>
        
        <div class="form-group">
          <label for="captcha">验证码</label>
          <div class="captcha-container">
            <input 
              type="text" 
              id="captcha" 
              v-model="formData.captcha" 
              @input="validateCaptcha"
              :class="{ 'is-invalid': captchaError }"
              required
            >
            <img 
              src="@/assets/images/image.jpg" 
              alt="验证码" 
              style="width: 100px; margin-top: 5px;"
              @click="refreshCaptcha"
            >
          </div>
          <div v-if="captchaError" class="error-message">{{ captchaError }}</div>
        </div>
        
        <button 
          type="submit" 
          :disabled="!isFormValid"
          :class="{ 'disabled': !isFormValid }"
        >
          登录
        </button>
      </form>
      <div class="form-link">
        还没有账号？<router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import HeaderNav from '@/components/HeaderNav.vue';
import Announcement from '@/components/Announcement.vue';

const formData = ref({
  email: '',
  password: '',
  captcha: ''
});

// 错误信息
const emailError = ref('');
const passwordError = ref('');
const captchaError = ref('');

// 验证邮箱
const validateEmail = () => {
  const email = formData.value.email.trim();
  emailError.value = '';
  
  if (!email) {
    emailError.value = '邮箱不能为空';
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.value = '请输入有效的邮箱地址';
    return false;
  }
  
  return true;
};

// 验证密码
const validatePassword = () => {
  const password = formData.value.password;
  passwordError.value = '';
  
  if (!password) {
    passwordError.value = '密码不能为空';
    return false;
  }
  
  if (password.length < 6) {
    passwordError.value = '密码长度至少为6位';
    return false;
  }
  
  passwordError.value = '';
  return true;
};

// 验证验证码
const validateCaptcha = () => {
  const captcha = formData.value.captcha.trim();
  captchaError.value = '';
  
  if (!captcha) {
    captchaError.value = '验证码不能为空';
    return false;
  }
  
  if (captcha.length !== 4) {
    captchaError.value = '验证码应为4位';
    return false;
  }
  
  return true;
};

// 刷新验证码
const refreshCaptcha = () => {
  const img = document.getElementById('captcha').nextElementSibling;
  img.src = `@/assets/images/image.jpg?t=${new Date().getTime()}`;
  formData.value.captcha = '';
  captchaError.value = '';
};

// 表单是否有效
const isFormValid = computed(() => {
  return (
    validateEmail() &&
    validatePassword() &&
    validateCaptcha()
  );
});

const handleLogin = () => {
  if (!isFormValid.value) {
    validateEmail();
    validatePassword();
    validateCaptcha();
    return;
  }
  
  // 模拟登录请求
  // 实际项目中应调用后端API
  // axios.post('/api/login', {
  //   email: formData.value.email,
  //   password: formData.value.password,
  //   captcha: formData.value.captcha
  // })
  // .then(response => {
  //   // 登录成功处理
  //   localStorage.setItem('token', response.data.token);
  //   alert('登录成功，即将跳转到首页');
  //   window.location.href = '/';
  // })
  // .catch(error => {
  //   let errorMsg = '登录失败，请稍后再试';
  //   if (error.response && error.response.data && error.response.data.message) {
  //     errorMsg = error.response.data.message;
  //   }
  //   alert(errorMsg);
  // });
  
  // 演示用
  alert('登录成功，即将跳转到首页');
  window.location.href = '/';
};
</script>

<style scoped>
/* 复制 dl.html 中的样式并添加验证相关样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

/* 头部导航栏样式 */
header {
  background-color: #1e1e1e;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 40px;
}

nav a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
}

.login-register {
  color: white;
  text-decoration: none;
  margin-left: 20px;
}

/* 公告栏样式 */
.announcement {
  background-color: #ffeeba;
  color: #007bff;
  text-align: center;
  padding: 5px;
  margin-bottom: 10px;
}

/* 表单容器 */
.form-container {
  width: 500px;
  margin: 0 auto;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  padding: 20px;
}

/* 表单标题 */
.form-title {
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: bold;
}

/* 表单字段组 */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.form-group input.is-invalid {
  border-color: #dc3545;
  background-color: #f8d7da;
}

/* 错误信息样式 */
.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 3px;
}

/* 提示信息 */
.tips {
  background-color: #cfe2ff;
  color: #0056b3;
  padding: 5px 10px;
  border-radius: 3px;
  margin-bottom: 15px;
  font-size: 14px;
}

/* 按钮样式 */
button {
  background-color: #8ecae6;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover:not(.disabled) {
  background-color: #4ea8de;
}

button.disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* 链接样式 */
.form-link {
  margin-top: 15px;
  font-size: 14px;
}

.form-link a {
  color: #007bff;
  text-decoration: none;
}

.form-link a:hover {
  text-decoration: underline;
}
</style>