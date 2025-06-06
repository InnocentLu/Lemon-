<template>
  <div id="app">
    <div>
    <!-- 头部导航栏 -->
    <HeaderNav />
    <!-- 公告栏 -->
    <Announcement />
    <!-- 登录表单 -->
     </div>

    <!-- 商品展示区 -->
    <section class="product-showcase">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product"
        :data-product="product.name"
        :data-price="product.price"
      >
        <img :src="product.image" :alt="product.name">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p class="price">{{ product.price }}元起</p>
        <p class="promotion">顺丰包邮 拥有相关游戏库可获得折扣</p>
        <router-link to="/shopitem" class="product-detail">商品详情</router-link>
        <button class="add-to-cart" @click="addToCart(product)">加入购物车</button>
      </div>
    </section>

    <!-- 购物车 -->
    <div class="shopping-cart" @click="toggleCart">
      <i class="fa fa-shopping-cart"></i>
      <span class="cart-count">{{ cartTotalItems }}</span>
    </div>

    <!-- 购物车商品列表（添加Transition包裹） -->
    <Transition name="cart-slide">
      <div v-if="isCartVisible" class="cart-items">
        <ul>
          <li v-for="(item, index) in cart.items" :key="index">
            {{ item.name }} × {{ item.quantity }} - {{ (item.price * item.quantity).toFixed(2) }}元
            <button class="remove-from-cart" @click="removeFromCart(index)">移除</button>
          </li>
        </ul>
        <div class="cart-total">总价: {{ cartTotalPrice.toFixed(2) }}元</div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderNav from '@/components/HeaderNav.vue';
import Announcement from '@/components/Announcement.vue';

// 导入所有需要的图片
import Sp01 from '@/assets/images/Sp01.png';
import Sp02 from '@/assets/images/Sp02.png';
import Sp03 from '@/assets/images/Sp03.png'; // 新增导入
import Sp04 from '@/assets/images/Sp04.png';
import Sp05 from '@/assets/images/Sp05.png';
import Sp06 from '@/assets/images/Sp06.png';
import Sp07 from '@/assets/images/Sp07.png'; // 新增导入
import Sp08 from '@/assets/images/Sp08.png'; // 新增导入
import Sp09 from '@/assets/images/Sp09.png'; // 新增导入
// 商品数据
const products = ref([
  {
    name: '《千恋*万花》主题亚克力方块（日版）',
    price: 587,
    description: '亚克力方块（约14.8x21x2cm）',
    image: Sp01
  },
  {
    name: '《千恋*万花》主题亚克力方块（日版）',
    price: 587,
    description: '亚克力方块（约14.8x21x2cm）',
    image: Sp02
  },
  {
    name: '《Riddle Joker》主题亚克力方块（日版）',
    price: 587,
    description: '亚克力方块（约14.8x21x2cm）',
    image: Sp03
  },
  {
    name: '《Riddle Joker》主题亚克力方块（日版）',
    price: 587,
    description: '亚克力方块（约14.8x21x2cm）',
    image: Sp04
  },
  {
    name: '《Riddle Joker》主题亚克力方块（日版）',
    price: 587,
    description: '亚克力方块（约14.8x21x2cm）',
    image: Sp05
  },
  {
    name: '《Riddle Joker》主题亚克力方块（日版）',
    price: 587,
    description: '亚克力方块（约14.8x21x2cm）',
    image: Sp06
  },
  {
    name: '《制服女友》主题挂画',
    price: 188,
    description: 'B2竖版（约50x70cm）',
    image: Sp07
  },
  {
    name: '《苍之彼方的四重奏》主题挂画',
    price: 188,
    description: '《苍之彼方的四重奏》主题挂画',
    image: Sp08
  },
  {
    name: '《月影魅像-解放之羽-》主题挂画 ',
    price: 188,
    description: 'B2竖版（约50x70cm）',
    image: Sp09
  }
]);

// 购物车数据
const cart = ref({
  items: [],
  total: 0
});

// 购物车是否可见
const isCartVisible = ref(false);

// 计算购物车商品总数
const cartTotalItems = ref(0);
const cartTotalPrice = ref(0);

// 向购物车添加商品
const addToCart = (product) => {
  const existingItem = cart.value.items.find(item => item.name === product.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.value.items.push({
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }
  updateCart();
};

// 从购物车移除商品
const removeFromCart = (index) => {
  cart.value.items.splice(index, 1);
  updateCart();
};

// 更新购物车状态
const updateCart = () => {
  // 更新商品数量
  cartTotalItems.value = cart.value.items.reduce((sum, item) => sum + item.quantity, 0);

  // 更新总价
  cartTotalPrice.value = cart.value.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // 显示或隐藏购物车
  isCartVisible.value = cartTotalItems.value > 0;
};

// 切换购物车显示状态
const toggleCart = () => {
  isCartVisible.value = !isCartVisible.value;
};
</script>

<style scoped>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

/* 顶部导航栏 */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  color: white;
  padding: 10px 20px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 40px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
}

.user-actions a {
  color: white;
  text-decoration: none;
  margin-left: 10px;
}

/* 通知栏 */
.notification-bar {
  background-color: #ffe599;
  color: #333;
  text-align: center;
  padding: 10px;
}

/* 商品展示区 */
.product-showcase {
  display: grid;
  /* 修改为3列布局 */
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  grid-gap: 20px;
  padding: 20px;
}

.product {
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.product img {
  width: 100%;
  height: auto;
}

.product h3 {
  padding: 10px;
  font-size: 16px;
}

.product p {
  padding: 0 10px 10px;
  font-size: 14px;
}

.price {
  color: #ff6600;
}

.promotion {
  color: #ff6600;
  font-size: 12px;
}

.product-detail,
.add-to-cart {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
  transition: all 0.2s ease;  /* 调整过渡时间更自然 */
}

.product-detail {
  background-color: #008CBA;
  color: white;
  text-decoration: none;
}

.product-detail:hover {
  background-color: #0077a3;  /* 悬停时蓝色加深 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);  /* 添加悬停阴影 */
}

.add-to-cart {
  background-color: #f4c20d;
  color: white;
}

.add-to-cart:hover {
  background-color: #d6ab00;  /* 悬停时黄色加深 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);  /* 添加悬停阴影 */
}

/* 点击动画保持原有 */
.product-detail:active,
.add-to-cart:active {
  transform: scale(0.98);
  filter: brightness(0.9);
}

/* 购物车 */
/* 购物车图标入场动画 */
@keyframes bounceIn {
  0% {
    transform: translateY(100%) scale(0.5);
    opacity: 0;
  }
  60% {
    transform: translateY(-10%) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

.shopping-cart {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ffcc00;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  animation: bounceIn 0.5s ease-out; /* 添加入场动画 */
}

.shopping-cart i {
  font-size: 24px;
  color: white;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  font-size: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 购物车商品列表样式 */
.cart-items {
  position: fixed;
  bottom: 70px;
  right: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  z-index: 1000;
}

.cart-items ul {
  list-style-type: none;
  padding: 0;
}

.cart-items li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.cart-items li button {
  background-color: transparent;
  border: none;
  color: #ff6600;
  cursor: pointer;
}

/* 购物车总价样式 */
.cart-total {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  font-weight: bold;
}

/* 购物车列表弹出动画 */
.cart-slide-enter-active,
.cart-slide-leave-active {
  transition: all 0.3s ease;
}

.cart-slide-enter-from,
.cart-slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>