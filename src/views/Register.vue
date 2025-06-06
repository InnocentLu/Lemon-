<template>
  <div>
    <!-- 头部导航栏 -->
    <HeaderNav />
    <!-- 公告栏 -->
    <Announcement />
    <!-- 注册表单 -->
    <div class="form-container">
      <div class="form-title">注册</div>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="nickname">昵称</label>
          <input 
            type="text" 
            id="nickname" 
            v-model="formData.nickname" 
            @input="validateNickname"
            :class="{ 'is-invalid': nicknameError }"
            required
          >
          <div v-if="nicknameError" class="error-message">{{ nicknameError }}</div>
        </div>
        
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
        <div class="tips">请使用有效的电子邮件地址注册以接收激活邮件。</div>
        
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
          <div v-if="passwordStrength < 3" class="password-strength">
            密码强度: 
            <span :class="{ 'strength-bar-weak': passwordStrength < 2, 'strength-bar-medium': passwordStrength >= 2 && passwordStrength < 4, 'strength-bar-strong': passwordStrength >= 4 }">
              {{ '●'.repeat(passwordStrength) + '○'.repeat(4 - passwordStrength) }}
            </span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="confirm-password">确认密码</label>
          <input 
            type="password" 
            id="confirm-password" 
            v-model="formData.confirmPassword" 
            @input="validateConfirmPassword"
            :class="{ 'is-invalid': confirmPasswordError }"
            required
          >
          <div v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</div>
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
          注册
        </button>
      </form>
      <div class="form-link">
        已有账号？<router-link to="/login">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import HeaderNav from '@/components/HeaderNav.vue';
import Announcement from '@/components/Announcement.vue';

const formData = ref({
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
  captcha: ''
});

// 错误信息
const nicknameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const captchaError = ref('');

// 密码强度
const passwordStrength = ref(0);

// 验证昵称
const validateNickname = () => {
  const nickname = formData.value.nickname.trim();
  nicknameError.value = '';
  
  if (!nickname) {
    nicknameError.value = '昵称不能为空';
    return false;
  }
  
  if (nickname.length < 2 || nickname.length > 20) {
    nicknameError.value = '昵称长度应为2-20个字符';
    return false;
  }
  
  if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(nickname)) {
    nicknameError.value = '昵称只能包含字母、数字和中文';
    return false;
  }
  
  return true;
};

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
    updatePasswordStrength(0);
    return false;
  }
  
  if (password.length < 8) {
    passwordError.value = '密码长度至少为8位';
    updatePasswordStrength(1);
    return false;
  }
  
  let strength = 0;
  
  // 检查是否包含大写字母
  if (/[A-Z]/.test(password)) strength++;
  // 检查是否包含小写字母
  if (/[a-z]/.test(password)) strength++;
  // 检查是否包含数字
  if (/[0-9]/.test(password)) strength++;
  // 检查是否包含特殊字符
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  updatePasswordStrength(strength);
  
  if (strength < 2) {
    passwordError.value = '密码太简单，请使用至少两种字符组合';
    return false;
  }
  
  passwordError.value = '';
  return true;
};

// 更新密码强度
const updatePasswordStrength = (strength) => {
  passwordStrength.value = strength;
};

// 验证确认密码
const validateConfirmPassword = () => {
  const confirmPassword = formData.value.confirmPassword;
  const password = formData.value.password;
  confirmPasswordError.value = '';
  
  if (!confirmPassword) {
    confirmPasswordError.value = '确认密码不能为空';
    return false;
  }
  
  if (confirmPassword !== password) {
    confirmPasswordError.value = '两次输入的密码不一致';
    return false;
  }
  
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
  // 实际项目中这里应该调用后端接口获取新的验证码
  // 这里仅做演示，刷新图片
  const img = document.getElementById('captcha').nextElementSibling;
  img.src = `@/assets/images/image.jpg?t=${new Date().getTime()}`;
  formData.value.captcha = '';
  captchaError.value = '';
};

// 表单是否有效
const isFormValid = computed(() => {
  return (
    validateNickname() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword() &&
    validateCaptcha()
  );
});

const handleRegister = () => {
  if (!isFormValid.value) {
    // 确保所有字段都验证一次，显示所有错误
    validateNickname();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateCaptcha();
    return;
  }
  
  // 这里可以添加提交表单到后端的逻辑
  // 示例：
  // axios.post('/api/register', formData.value)
  //   .then(response => {
  //     alert('注册成功，即将跳转到登录页面');
  //     window.location.href = '/login';
  //   })
  //   .catch(error => {
  //     alert('注册失败：' + error.response.data.message);
  //   });
  
  // 演示用
  alert('注册成功，即将跳转到登录页面');
  window.location.href = '/login';
};
</script>

<style scoped>
/* 复制 zc.html 中的样式并添加验证相关样式 */
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

/* 密码强度指示器 */
.password-strength {
  font-size: 12px;
  color: #6c757d;
  margin-top: 3px;
}

.strength-bar-weak {
  color: #dc3545; /* 红色 - 弱 */
}

.strength-bar-medium {
  color: #ffc107; /* 黄色 - 中 */
}

.strength-bar-strong {
  color: #28a745; /* 绿色 - 强 */
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