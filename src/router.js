import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
// import { Store } from "../store"
// const store = Store()

Vue.use(Router);
Vue.use(Meta, {
  ssrAttribute: 'data-vue-meta-server-rendered',
});

// route-level code splitting
const Nonprofit = () => import('@/views/Nonprofit.vue');
const HomePage = () => import('@/views/HomePage.vue');
const Default404 = () => import('@/views/Default404.vue');

export default new Router({
  mode: 'history',
  fallback: false,
  saveScrollPosition: true,
  scrollBehavior(to, from, savedPosition) {
    if (!to.name.includes('/donate')) {
      // Retain position if we are opening a donate (modal) route
      return { y: 0 };
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/nonprofit/:id',
      name: 'nonprofit-profile',
      component: Nonprofit,
    },
    {
      path: '/fundraiser/1',
      name: 'fundraiser-main',
      redirect: '/fundraiser',
    },
    {
      path: '/404',
      name: 'Default',
      component: Default404,
    },
  ],
});
