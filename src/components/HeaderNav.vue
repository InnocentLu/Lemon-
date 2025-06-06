<template>
  <header>
    <div class="header-left">
      <img src="@/assets/images/logo.png" alt="HIKARI FIELD STORE" class="logo">
      <span>凝新聚华，将美少女游戏文化推向世界！</span>
    </div>
    <nav>
      <router-link to="/home">视觉小说</router-link>
      <router-link to="/shopping">选购周边</router-link>
      <a href="#">音声作品</a>
      <a href="#">客户端</a>
      <a href="#">积分奖池</a>
      <a href="#">福利回馈</a>
      <a href="#">B站空间</a>
      <a href="#">制作进度</a>
      <a href="#">帮助支持</a>
    </nav>
    <div class="header-right">
      <router-link to="/register" class="login-register">注册</router-link>
      <router-link to="/login" class="login-register">登录</router-link>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
/* 复制头部导航栏样式 */
header {
  background-color: #1e1e1e;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

nav {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}

nav a, nav .router-link-active {
  color: white;
  text-decoration: none;
  margin-left: 20px;
  margin-right: 20px;
  white-space: nowrap;
  transition: color 0.3s ease; /* 添加过渡动画 */
}

nav a:hover, nav .router-link-active:hover {
  color: #ffd700; /* 鼠标悬浮时变黄（金色） */
}

.header-right {
  display: flex;
  align-items: center;
}

.login-register {
  color: white;
  text-decoration: none;
  margin-left: 20px;
  transition: color 0.3s ease; /* 右侧注册/登录按钮同样添加过渡 */
}

.login-register:hover {
  color: #ffd700; /* 右侧按钮悬浮变黄 */
}

/* 响应式：小屏幕下导航栏可换行或缩小字体 */
@media (max-width: 900px) {
  nav a, nav .router-link-active {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 14px;
  }
  .logo {
    height: 30px;
  }
  header {
    padding: 8px 10px;
  }
}

@media (max-width: 600px) {
  nav {
    flex-wrap: wrap;
  }
  nav a, nav .router-link-active {
    font-size: 12px;
    margin: 5px;
  }
  .header-left span {
    display: none;
  }
}
</style>