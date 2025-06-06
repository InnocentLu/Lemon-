import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import GameDetail from '../views/GameDetail.vue';
import Donghua from '../views/donghua.vue' ;
import Shopping from '../views/Shopping.vue';// 新增：导入 donghua 组件
import ShopItem from '../views/ShopItem.vue';

const routes = [
  {
    path: '/',
    name: 'DonghuaHome', // 修改：路由名称
    component: Donghua // 修改：指向 donghua.vue
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/game/1',
    name: 'GameDetail',
    component: GameDetail
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/shopping', // 新增：购物车路由
    name: 'Shopping',
    component: Shopping
  },
  {
    path: '/shopitem',
    name: 'ShopItem',
    component: ShopItem
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;