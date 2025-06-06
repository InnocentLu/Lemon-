<template>
  <div id="wrapper">
    <div id="bg"></div>
    <div id="overlay"></div>
    <div id="main">
      <!-- Header -->
      <header id="header">
        <h1> <span class="nowrap">LEMON 社</span></h1>
        <p>凝新聚华，将美少女游戏文化推向世界！</p>
        <nav>
          <ul>
            <li>
              <a href="http://weibo.com/u/5575223769" target="_blank" rel="noopener">
                <img width="100" height="100" src="https://img.icons8.com/ios-filled/100/ffffff/weibo.png" alt="weibo" />
              </a>
            </li>
            <li>
              <a href="#">
                <img width="48" height="48" src="https://img.icons8.com/pulsar-line/100/ffffff/weixing.png" alt="weixing" />
              </a>
            </li>
            <li>
              <a href="https://m.facebook.com/hikarifield" target="_blank" rel="noopener">
                <img width="50" height="50" src="https://img.icons8.com/ios/50/ffffff/facebook-new.png" alt="facebook-new" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/hikari_field" target="_blank" rel="noopener">
                <img width="100" height="100" src="https://img.icons8.com/ios/100/ffffff/twitter--v1.png" alt="twitter--v1" />
              </a>
            </li>
            <li>
              <a href="#">
                <img width="250" height="250" src="https://img.icons8.com/ios/250/ffffff/bilibili.png" alt="bilibili" />
              </a>
            </li>
          </ul>
          <div class="hf-margin-top">
            <router-link to="/home" target="_blank" class="hf-universe-link">【欢迎加入LEMON社】</router-link>
          </div>
        </nav>
      </header>

      <!-- Footer -->
      <footer id="footer">
        <span class="copyright">世界上最大的galgame网站</span>
      </footer>
    </div>
  </div>
</template>

<script>
// 引入 jQuery 和 fancybox（需确保项目已安装相关依赖）

export default {
  data() {
    return {
      isLoading: true // 加载状态，用于控制 body 类
    };
  },
  mounted() {
    // 模拟原 HTML 中的 window.onload 事件
    window.onload = () => {
      this.isLoading = false;
    };

    // 初始化 fancybox（原 $(document).ready 逻辑）
    $(document).ready(() => {
      $('.fancybox').fancybox();
    });

    // 处理触摸和旋转事件（原逻辑）
    window.ontouchmove = () => false;
    window.onorientationchange = () => {
      document.body.scrollTop = 0;
    };
  }
};
</script>

<style scoped>
/* 引入原 CSS 文件（需确保路径正确） */
@import '../css/main.css';  /* 修正为上级目录下的 css 文件夹 */
@import '../css/jquery.fancybox.css';  /* 修正为上级目录下的 css 文件夹 */

/* 如果需要覆盖或补充样式，可在此添加 */
body {
  /* 原 body 类 "loading" 的样式可通过动态绑定控制 */
  transition: opacity 0.3s;
}
body.loading {
  opacity: 0;
}
body:not(.loading) {
  opacity: 1;
}
</style>