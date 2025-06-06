<template>
  <div>
    <!-- 头部导航栏 -->
    <HeaderNav />
    <!-- 游戏横幅 -->
    <div class="game-banner">萌系游戏大赏纯爱类年度金奖作品</div>
    <!-- 主体内容 -->
    <div class="main-content">
      <!-- 游戏图片区域 -->
      <div class="game-image">
        <img v-for="(image, index) in gameImages" :key="index" :src="image" :alt="`Image ${index + 1}`" :class="{ active: index === currentIndex }">
      </div>
      <!-- 右侧游戏信息区域 -->
      <div class="game-info">
        <h2>玩家评价</h2>
        <!-- 饼图展示 -->
        <div class="pie-chart">
          <span>8.5/10</span>
        </div>
        <a href="#" class="evaluate-button">进行评价（可获得积分奖励）</a>
        <h2>游戏信息</h2> 
        <table class="game-info-table"> 
          <tbody> <!-- 添加 tbody 标签 -->
            <tr> 
              <th>游戏名称</th> 
              <td>近月少女的礼仪2</td> 
            </tr> 
            <tr> 
              <th>游戏类型</th> 
              <td>恋爱冒险ADV</td> 
            </tr> 
            <tr> 
              <th>游戏品牌</th> 
              <td>Navel</td> 
            </tr> 
            <tr> 
              <th>发行商</th> 
              <td>HIKARI FIELD</td> 
            </tr> 
            <tr> 
              <th>发售日期</th> 
              <td>2025年5月9日</td> 
            </tr>
          </tbody> <!-- 闭合 tbody -->
        </table>
        
        <!-- 新增历史评价展示区域 -->
        <div class="history-reviews mt-8">
          <h3 class="text-lg font-semibold mb-4">历史评价</h3>
          <div class="space-y-4" v-if="reviews.length">
            <div v-for="(review, idx) in reviews" :key="idx" class="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div class="flex items-center mb-2">
                <div class="text-yellow-400">
                  <span v-for="i in review.rating" :key="'star-'+i">★</span>
                  <span v-for="i in 5 - review.rating" :key="'empty-'+i" class="text-gray-300">★</span>
                </div>
                <span class="ml-2 text-sm text-gray-500">提交于 {{ new Date().toLocaleDateString() }}</span>
              </div>
              <p class="text-gray-700">{{ review.content }}</p>
              <div class="flex gap-2 mt-3" v-if="review.images.length">
                <img 
                  v-for="(img, imgIdx) in review.images" 
                  :key="imgIdx" 
                  :src="img" 
                  alt="评价图片" 
                  class="w-16 h-16 object-cover rounded"
                >
              </div>
            </div>
          </div>
          <p v-else class="text-gray-500">暂无历史评价</p>
        </div>
      </div>
    </div>
    <!-- 新增的介绍图片区域 - 位于两个表单下方 -->
     <!-- 关键调整：py-1 → py-0，消除容器上下内边距 -->
     <img 
          :src="imageSrc" 
          alt="介绍" 
          width="1180"  
          height="auto" 
          class="rounded-lg object-cover transform transition-all hover:scale-105 float-left" 
          @error="handleImageError"
        >
    <!-- 评价功能区域 -->
        <div id="review-form" class="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6 border-b pb-2">写下你的评价</h2>
          <form class="space-y-4">
            <div>
              <label class="block text-gray-700 mb-2">评分</label>
              <div class="flex text-yellow-400">
                <!-- 修复后的评分按钮，使用点击事件更新rating，并添加选中样式 -->
                <button 
                  type="button" 
                  :class="{ 'text-yellow-500': rating === 1, 'text-yellow-400': rating !== 1 }"
                  @click="rating = 1"
                >★</button>
                <button 
                  type="button" 
                  :class="{ 'text-yellow-500': rating === 2, 'text-yellow-400': rating !== 2 }"
                  @click="rating = 2"
                >★</button>
                <button 
                  type="button" 
                  :class="{ 'text-yellow-500': rating === 3, 'text-yellow-400': rating !== 3 }"
                  @click="rating = 3"
                >★</button>
                <button 
                  type="button" 
                  :class="{ 'text-yellow-500': rating === 4, 'text-yellow-400': rating !== 4 }"
                  @click="rating = 4"
                >★</button>
                <button 
                  type="button" 
                  :class="{ 'text-yellow-500': rating === 5, 'text-yellow-400': rating !== 5 }"
                  @click="rating = 5"
                >★</button>
              </div>
            </div>
            <div>
              <label class="block text-gray-700 mb-2">评价内容</label>
              <textarea 
                v-model="reviewContent"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
                rows="4"
                placeholder="分享你对这款游戏的看法..."
              ></textarea>
            </div>
            <div>
              <label class="block text-gray-700 mb-2">上传图片（可选）</label>
              <div class="flex flex-wrap gap-2">
                <div class="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-yellow-300 transition-colors">
                  <i class="fa fa-cloud-upload text-gray-400 text-2xl"></i>
                  <input type="file" accept="image/*" class="hidden" @change="handleImageUpload">
                </div>
                <!-- 已上传的图片预览 -->
                <div v-for="(img, index) in uploadedImages" :key="index" class="w-20 h-20 relative">
                  <img :src="img" alt="预览" class="w-full h-full object-cover rounded-lg">
                  <button @click="removeImage(index)" class="absolute top-1 right-1 bg-black/50 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs hover:bg-black transition-colors">×</button>
                </div>
              </div>
            </div>
            <button 
              type="submit" 
              @click.prevent="submitReview"
              class="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              提交评价
            </button>
          </form>
        </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderNav from '@/components/HeaderNav.vue';

const imageSrc = ref(new URL('@/assets/images/001_1.jpg', import.meta.url).href);
const gameImages = [
  new URL('@/assets/images/001.jpg', import.meta.url).href,
  new URL('@/assets/images/002.jpg', import.meta.url).href,
  new URL('@/assets/images/003.jpg', import.meta.url).href,
  new URL('@/assets/images/012.jpg', import.meta.url).href
];
const currentIndex = ref(0);

const showImage = (index) => {
  currentIndex.value = index;
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % gameImages.length;
};

onMounted(() => {
  setInterval(nextImage, 3000);
});

// 新增历史评价数组
const reviews = ref([]);
// 新增当前评价内容存储（已存在则补充）
const reviewContent = ref('');
const rating = ref(0);
const uploadedImages = ref([]);

// 完善提交评价方法
const submitReview = () => {
  // 基础校验（已存在则保留）
  if (!rating.value) {
    alert('请先选择评分');
    return;
  }
  if (!reviewContent.value.trim()) {
    alert('请输入评价内容');
    return;
  }

  // 添加到历史评价（新增）
  reviews.value.push({
    rating: rating.value,
    content: reviewContent.value,
    images: [...uploadedImages.value] // 复制图片数组
  });

  // 清空表单（已存在则补充）
  rating.value = 0;
  reviewContent.value = '';
  uploadedImages.value = [];
};

// 新增图片上传方法（若未存在则补充）
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      uploadedImages.value.push(event.target.result);
    };
    reader.readAsDataURL(file);
  }
};

// 新增图片移除方法（若未存在则补充）
const removeImage = (index) => {
  uploadedImages.value.splice(index, 1);
};
</script>

<style scoped>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 整体页面布局 */
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

/* 游戏横幅样式 */
.game-banner {
  background-color: #ffc107;
  color: white;
  padding: 5px 10px;
  margin-bottom: 10px;
}

/* 主体内容布局（轮播图父容器） */
.main-content {
  display: flex;
  margin-bottom: 0;  /* 已设置为0，无底部边距 */
}

/* 游戏图片区域样式 */
.game-image {
  flex: 3;  /* 增加轮播图区域的比例 */
  position: relative;
  height: 600px;  /* 增加高度使图片更舒展 */
  overflow: hidden;
}

.game-image img {
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  object-fit: cover;  /* 保持图片比例，覆盖容器 */
}

.game-image img.active {
  opacity: 1;
}

/* 右侧信息区域样式 */
.game-info {
  flex: 1;
  padding: 0 20px;
}

/* 玩家评价标题样式 */
.game-info h2 {
  margin-bottom: 10px;
}

/* 饼图样式 */
.pie-chart {
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  border: 1px solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: conic-gradient(#4CAF50 70%, #FFC107 20%, #F44336 10%);
}

.pie-chart span {
  font-weight: bold;
}

/* 评价按钮样式 */
.evaluate-button {
  display: block;
  width: 100%;
  background-color: #ffc107;
  color: white;
  text-align: center;
  padding: 10px;
  text-decoration: none;
  margin-bottom: 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.evaluate-button:hover {
  background-color: #e0a800;
}

/* 游戏信息表格样式 */
.game-info-table {
  width: 100%;
  border-collapse: collapse;
}

.game-info-table th,
.game-info-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.xm {
  margin-top: 8px;  /* 关键调整：16px → 8px */
}

.game-info-table th {
  background-color: #f9f9f9;
}
/* 双列布局区域 */
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.lg\\:flex-row {
  flex-direction: row;
}

.gap-8 {
  gap: 2rem;
}

.lg\\:w-1 {
  width: 50%;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.text-xl {
  font-size: 1.25rem;
}

.font-bold {
  font-weight: bold;
}

.text-gray-900 {
  color: #1f2937;
}

.border-b {
  border-bottom: 1px solid #e5e7eb;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.pb-2 {
  padding-bottom: 0.5rem;
}

.w-full {
  width: 100%;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.transition-all {
  transition: all 0.3s ease;
}

/* 评分样式 */
.text-yellow-400 {
  color: #fdba74;
}

.text-yellow-500 {
  color: #fbbf24;
}

/* 图片上传区域 */
.border-dashed {
  border-style: dashed;
}

.text-gray-400 {
  color: #9ca3af;
}

/* 按钮样式 */
button {
  cursor: pointer;
  font-family: inherit;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .game-image {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .lg\\:w-1 {
    width: 100%;
  }
}

/* 新增历史评价样式 */
.history-reviews {
  margin-top: 2rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  /* 固定高度，超出滚动 */
  height: 320px;
  overflow-y: auto;
}

.history-reviews h3 {
  color: #1f2937;
  font-size: 1.125rem;
}

.history-reviews .text-gray-500 {
  color: #64748b;
}

.history-reviews img {
  border-radius: 0.375rem;
  object-fit: cover;
  /* 让图片适应评论区，不撑大评论区 */
  max-width: 80px;
  max-height: 80px;
  width: auto;
  height: auto;
  display: inline-block;
}
</style>