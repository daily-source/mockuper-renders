import '@babel/polyfill'
import Datetime from 'vue-datetime';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import * as filters from "./xthon-core/lib/util/filters"
import SmoothScroll from 'Components/plugins/SmoothScroll'
import BannerSwitcher from 'LocalComponents/BannerSwitcher'
import store from './store';

// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css';

Vue.config.productionTip = false;

Vue.use(Datetime);

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.use(SmoothScroll);

const bgImages = [
  'banner-img-1.jpg',
  'banner-img-2.jpg',
  'banner-img-3.jpg',
  'banner-img-4.jpg',
  'banner-img-5.jpg',
  'banner-img-6.jpg',
]

Vue.use(BannerSwitcher, store, {bgImages, selected: 0})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
