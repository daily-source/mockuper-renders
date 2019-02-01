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
const UserProfileEdit = () => import('@/views/UserProfileEdit')
const UserRegister = () => import('@/views/UserRegister')
const NonprofitDirectory = () => import('@/views/NonprofitDirectory')

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
			path: '/user/:userId',
			name: 'user-profile',
			component: UserProfile,
		},
		{
			path: '/user/:userId/edit',
			name: 'user-edit',
			component: UserProfileEdit,
    },
    {
      path: '/nonprofit-directory',
      name: 'nonprofit-directory',
      component: NonprofitDirectory,
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegister,
    },
  ],
});
