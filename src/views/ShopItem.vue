<template>
  <div id="app" class="bg-white min-h-screen">
    <!-- 头部导航栏 -->
    <HeaderNav />
    
    <!-- 公告栏 -->
    <Announcement />
    
    <!-- 未登录提示 -->
    <div class="bg-blue-100 text-blue-800 p-4 m-3 rounded-lg shadow-sm border-l-4 border-blue-400">
      <div class="flex items-start">
        <i class="fa fa-info-circle text-blue-400 mt-1 mr-3 text-xl"></i>
        <p>您还没有登录，部分商品在您登录后有特定折扣，请先<a href="#" class="text-blue-600 hover:underline">注册会员</a>并登录。</p>
      </div>
    </div>

    <!-- 商品展示区 -->
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- 商品图片 -->
        <div class="lg:w-1/3">
          <img :src="mainImage" alt="《千恋＊万花》主题商品" class="w-full h-auto rounded-lg shadow-md">
        </div>

        <!-- 商品详情 -->
        <div class="lg:w-2/3">
          <h1 class="text-2xl font-bold mb-2">《千恋＊万花》主题亚克力方块（日版）</h1>
          <p class="text-gray-600 mb-4">亚克力方块 (约14.8x21x2cm)</p>

          <div class="flex items-center mb-4">
            <span class="text-gray-500 line-through mr-2">原价: 650元</span>
            <span class="text-red-600 font-bold text-xl">618元</span>
          </div>

          <!-- 折扣信息（修改后） -->
          <div class="bg-yellow-100 p-4 rounded mb-4">
            <p class="font-bold mb-2">本商品适用的折扣：</p>
            <ul class="list-disc pl-4">
              <li>拥有《千恋＊万花》时享受5%折扣仅需587元入手</li>
            </ul>
          </div>

          <!-- 产品款式 -->
          <div class="mb-4">
            <p class="font-bold mb-2">产品款式</p>
            <div class="flex space-x-2">
              <!-- 修改此处的 w-16 h-16 为更小的尺寸类（示例使用 w-12 h-12） -->
              <img
                v-for="(style, index) in styles"
                :key="index"
                :src="style"
                alt="款式"
                class="product-style-img rounded border-2"
                :class="[index === activeStyle ? 'border-orange-500 animate-border-pulse' : '',]"
                @click="setActiveStyle(index)"
              >
            </div>
          </div>
            <button class="bg-blue-100 text-blue-800 px-10 py-5 text-lg rounded-xl hover:bg-blue-200 active:scale-95 transition-transform" @click="goBackToPeripheralsList">返回周边列表</button>
        </div>
      </div>

      <!-- 商品规格与操作 -->
      <div class="mt-6">
        <h2 class="text-xl font-bold mb-4">产品规格</h2>
        <!-- 双列布局的规格信息 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white p-4 border rounded-lg shadow-sm">
            <p class="font-bold text-red-600 flex items-center">
              <i class="fa fa-cube mr-2"></i>亚克力方块
            </p>
            <p class="text-gray-600">(约14.8x21x2cm)</p>
          </div>
          <div class="bg-white p-4 border rounded-lg shadow-sm">
            <p class="font-bold text-gray-800 flex items-center">
              <i class="fa fa-clock-o mr-2"></i>发货时间
            </p>
            <p class="text-gray-600">订单支付后2个工作日内发货</p>
          </div>
          <div class="bg-white p-4 border rounded-lg shadow-sm">
            <p class="font-bold text-red-600 flex items-center">
              <i class="fa fa-truck mr-2"></i>发货范围
            </p>
            <p class="text-gray-600">暂仅限中国大陆地区，顺丰速运（包邮）</p>
          </div>
          <div class="bg-white p-4 border rounded-lg shadow-sm">
            <p class="font-bold text-red-600 flex items-center">
              <i class="fa fa-trophy mr-2"></i>成交积分
            </p>
            <p class="text-gray-600">购买后可获得1112积分</p>
          </div>
          <div class="bg-white p-4 border rounded-lg shadow-sm">
            <p class="font-bold text-red-600 flex items-center">
              <i class="fa fa-shopping-basket mr-2"></i>购买数量
            </p>
            <p class="text-gray-600">该商品当前仅限购买1件</p>
          </div>
        </div>

        <!-- 购买按钮 -->
        <div class="mt-6 flex space-x-2">
          <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">直接购买</button>
          <button class="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600">加入购物车</button>
          <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">返回</button>
        </div>

        <!-- 商品详情表格 -->
        <div class="mt-6">
          <h2 class="text-xl font-bold mb-2">商品详情</h2>
          <table class="w-full border-collapse">
            <tr>
              <th class="border p-2">产品名称</th>
              <th class="border p-2">版权</th>
              <th class="border p-2">出品</th>
            </tr>
            <tr>
              <td class="border p-2">《千恋＊万花》主题亚克力方块（日版）</td>
              <td class="border p-2">YUZUSOFT</td>
              <td class="border p-2">HIKARI FIELD</td>
            </tr>
            <tr>
              <td class="border p-2">款式</td>
              <td class="border p-2">丛雨</td>
              <td class="border p-2">规格：亚克力方块 (约14.8x21x2cm)<br>材质：亚克力</td>
            </tr>
            <tr>
              <td class="border p-2">包装种类</td>
              <td class="border p-2">日产原装</td>
              <td class="border p-2">发货方式：顺丰速运（包邮）<br>发货范围：暂仅限中国大陆地区</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- 固定购物车图标 -->
    <div class="fixed bottom-0 right-0 m-4">
      <button class="bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600">
        <i class="fa fa-shopping-cart text-xl"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderNav from '@/components/HeaderNav.vue';
import Announcement from '@/components/Announcement.vue';

// 产品款式图片（示例，需替换为实际路径）
// 原代码仅为导入图片，缩小图片需在展示处控制样式，此处导入代码保持不变
import sp01 from '@/assets/images/Sp01.png';
import sp02 from '@/assets/images/Sp02.png';
import sp03 from '@/assets/images/Sp03.png';
import sp04 from '@/assets/images/Sp04.png';

// 定义一个函数用于创建带动画的类名
const getAnimatedBorderClass = (index) => {
  return index === activeStyle.value ? 'border-orange-500 animate-border-pulse' : '';
};

const styles = ref([
  sp01,
  sp02,
  sp03,
  sp04
]);
const activeStyle = ref(0);
// 左侧主图的当前显示图片，初始为第一张
const mainImage = ref(sp01);

// 左侧主图切换
const setActiveStyle = (index) => {
  // 检查传入的索引是否在 styles 数组的有效范围内
  if (index >= 0 && index < styles.value.length) {
    activeStyle.value = index;
    // 切换左侧主图的显示图片
    mainImage.value = styles.value[index];
  } else {
    console.error('传入的索引超出了 styles 数组的有效范围');
  }
};
// 购买操作方法（示例）
const buyNow = () => {
  alert('直接购买功能');
};
const addToCart = () => {
  alert('加入购物车功能');
};
const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
/* 全局样式 */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

/* 头部导航栏 */
.header-nav {
  background-color: #000;
  color: white;
  padding: 10px 20px;
  border-bottom: 2px solid #ff6b6b;
}

.nav-links a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  transition: color 0.3s;
}
.nav-links a:hover {
  color: #ff6b6b;
}

/* 公告栏 */
.announcement {
  background-color: #f8e8c7;
  color: #4a89dc;
  padding: 8px 0;
  text-align: center;
}

/* 未登录提示 */
.bg-blue-100 {
  background-color: #eff6ff;
}

.text-blue-800 {
  color: #1e3a8a;
}

.border-blue-400 {
  border-color: #3b82f6;
}

.text-blue-600 {
  color: #2563eb;
}

/* 商品展示区 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.product-image {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.price-info {
  margin: 20px 0;
}

/* 折扣信息区域（修改后） */
.bg-yellow-100 {
  background-color: #fff3cd; /* 浅黄色背景 */
}
.font-bold {
  font-weight: bold;
}
.list-disc {
  list-style-type: disc;
  padding-left: 1.5rem;
}
.pl-4 {
  padding-left: 1rem;
}

.style-selection img {
  transition: all 0.3s;
}
.style-selection img:hover {
  transform: scale(1.05);
}

/* 购买按钮 */
button {
  transition: background-color 0.3s;
}
.bg-red-500:hover {
  background-color: #dc3545;
}
.bg-yellow-500:hover {
  background-color: #ffc107;
}
.bg-gray-500:hover {
  background-color: #6c757d;
}

/* 表格样式 */
table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

/* 固定购物车 */
.fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

/* 双列布局样式 */
.grid {
  display: grid;
  gap: 1rem;
}

/* 中等屏幕以上显示双列 */
@media (min-width: 768px) {
  .md\\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 规格卡片样式 */
.bg-white {
  background-color: white;
}

.border {
  border: 1px solid #ddd;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-sm {
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.p-4 {
  padding: 1rem;
}

.font-bold {
  font-weight: bold;
}

.text-red-600 {
  color: #e53e3e;
}

.text-gray-800 {
  color: #1f2937;
}

.text-gray-600 {
  color: #6b7280;
}

.flex {
  display: flex;
}
@keyframes borderPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 165, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(255, 165, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 165, 0, 0);
  }
}
.animate-border-pulse {
  animation: borderPulse 1s infinite;
  border-color: #ff9800 !important;
}
.items-center {
  align-items: center;
}

.mr-2 {
  margin-right: 0.5rem;
}
</style>

<style scoped>
/* 在现有样式中添加 */
.product-style-img {
  width: 120px; /* 自定义宽度 */
  height: 120px; /* 自定义高度 */
}
</style>