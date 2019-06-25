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
const UsersList = () => import('@/views/Users')
const NonprofitDirectory = () => import('@/views/NonprofitDirectory')
const NonprofitRegister = () => import('@/views/NonprofitRegister')
const NonprofitRegisterStepOne = () => import('@/views/NonprofitRegisterStepOne')
const NonprofitRegisterStepTwo = () => import('@/views/NonprofitRegisterStepTwo')
const NonprofitRegisterStepThree = () => import('@/views/NonprofitRegisterStepThree')
const NonprofitRegisterStepFour = () => import('@/views/NonprofitRegisterStepFour')
const NonprofitDetails = () => import('@/views/NonprofitDetails')
const StationsDirectory = () => import('@/views/StationsDirectory')
const StationProfile = () => import('@/views/StationProfile')
const StationEdit = () => import('@/views/StationEdit')

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
      path: '/users',
      name: 'user-list',
      component: UsersList,
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
      path: '/nonprofit/:nonprofitId',
      name:'nonprofit-details',
      component: NonprofitDetails,
    },
    {
      path: '/nonprofit-directory',
      name: 'nonprofit-directory',
      component: NonprofitDirectory,
    },
    {
      path: '/nonprofit-sign-up',
      component: NonprofitRegister,
      children: [
        {
          path: '/nonprofit-sign-up/step/1',
          name: 'nonprofit-sign-up-step-one',
          component: NonprofitRegisterStepOne,
        },
        {
          path: '/nonprofit-sign-up/step/2',
          name: 'nonprofit-sign-up-step-two',
          component: NonprofitRegisterStepTwo,
        },
        {
          path: '/nonprofit-sign-up/step/3',
          name: 'nonprofit-sign-up-step-three',
          component: NonprofitRegisterStepThree,
        },
        {
          path: '/nonprofit-sign-up/step/4',
          name: 'nonprofit-sign-up-step-four',
          component: NonprofitRegisterStepFour,
        },
        {
          path: '/',
          redirect: {
            name: 'nonprofit-sign-up-step-one'
          }
        },
      ],
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegister,
    },
    {
      path: '/stations-directory',
      name: 'stations-directory',
      component: StationsDirectory,
    },
    {
      path: '/station/:id',
      name: 'stations-profile',
      component: StationProfile,
    },
    {
      path: '/station/:id/edit',
      name: 'station-edit',
      component: StationEdit,
    },
    {
      path: '/stations/management',
      name: 'station-management',
      component: StationsDirectory,
      meta: {
        management: true,
      }
    },
    {
      path: '/nonprofits/management',
      name: 'nonprofits-management',
      component: NonprofitDirectory,
      meta: {
        management: true,
      }
    },
  ],
});
