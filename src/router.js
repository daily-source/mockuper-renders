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
const HomePage = () => import('@/views/HomePage')
const UserProfile = () => import('@/views/UserProfile')

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
			path: '/profile/:profileId',
			name: 'profile',
			component: UserProfile,
		},
  ],
});
