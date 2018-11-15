import Datetime from 'vue-datetime';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import * as filters from './util/filters';
import SmoothScroll from '@/components/plugins/smoothScroll';

// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css';

Vue.config.productionTip = false;

Vue.use(Datetime);

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.use(SmoothScroll);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
