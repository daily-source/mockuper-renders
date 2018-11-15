import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/fundraiser/254',
      name: 'fundraiser',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/nonprofit/237069110',
      name: 'nonprofit',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
