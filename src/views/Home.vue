<template>
  <div>
    <!-- 头部导航栏 -->
    <HeaderNav />
    <!-- 公告栏 -->
    <Announcement />
    <!-- 游戏展示区 -->
    <div class="game-container">
      <div class="game-item" v-for="(game, index) in games" :key="index" @click="goToGamePage(game.url)">
        <img :src="game.image" :alt="game.name">
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderNav from '@/components/HeaderNav.vue';
import Announcement from '@/components/Announcement.vue';

// 导入所有游戏图片
import game1Image from '@/assets/images/game1.png';
import game2Image from '@/assets/images/game2.png';
import game3Image from '@/assets/images/game3.png';
import game4Image from '@/assets/images/game4.png';
import game5Image from '@/assets/images/game5.png';
import game6Image from '@/assets/images/game6.png';
import game7Image from '@/assets/images/game7.png';
import game8Image from '@/assets/images/game8.png';
import game9Image from '@/assets/images/game9.png';
// 定义 games 数组（无需 export，直接在组件内使用）
const games = [
  { name: '近月少女的礼仪', image: game1Image, url: '/game/1' },
  { name: '青空下的约定 -Refine', image: game2Image, url: '' },
  { name: '恋爱与选举与巧克力', image: game3Image, url: '' },
  { name: '闪亮女友', image: game4Image, url: '' },
  { name: '天使的心跳 Re-Boot!', image: game5Image, url: '' },
  { name: '初雪樱', image: game6Image, url: '' },
  { name: '天选庶民的真命之选', image: game7Image, url: '' },
  { name: '绽放★青春全力向前冲！', image: game8Image, url: '' },
  {name:'痴情哥哥与病弱妹妹的乡间生活',image:game9Image,url:''}
];

const goToGamePage = (url) => {
  if (url) {
    window.location.href = url;
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box; /* 仅保留盒模型重置，移除margin/padding重置（避免覆盖外部样式） */
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
  padding: 10px;
  margin-bottom: 10px;
}

/* 游戏展示区样式 */
.game-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 保持3列布局 */
  gap: 20px;
  padding: 20px;
  width: 100%; /* 占满父容器宽度 */
  margin: 0; /* 移除水平居中的margin，使容器贴边 */
}

.game-item {
  position: relative;
  overflow: hidden; /* 确保缩放时内容不溢出容器 */
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.game-item img {
  width: 100%;
  height: 100%; 
  object-fit: cover; 
  display: block;
  transition: filter 0.3s ease, transform 0.3s ease; /* 同时过渡滤镜和缩放 */
  transform: scale(1); /* 初始缩放比例 */
}

.game-item img:hover {
  filter: grayscale(0.5); /* 淡灰滤镜（50%灰度） */
  transform: scale(1.1); /* 悬停时放大10%（从中心向外扩散） */
}

.game-status {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
}

.promotion {
  background-color: #dc3545;
}

.producing {
  background-color: #6c757d;
}
</style>