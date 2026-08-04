import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/index.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/index.vue'),
  },
  {
    path: '/world',
    name: 'World',
    component: () => import('../views/world/index.vue'),
  },
  {
    path: '/world/:slug',
    name: 'WorldDetail',
    component: () => import('../views/world/detail.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

