import '@babel/polyfill'
import Datetime from 'vue-datetime';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import * as filters from "./xthon-core/lib/util/filters"
import SmoothScroll from 'Components/plugins/SmoothScroll';
import * as VueGoogleMaps from 'vue2-google-maps'
import { createStore } from './xthon-core/lib/store'
import users from './store/modules/user'
// You need a specific loader for CSS files
// import 'vue-datetime/dist/vue-datetime.css';
Vue.config.productionTip = false;

Vue.use(Datetime);

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.use(SmoothScroll);

Vue.use(VueGoogleMaps, {
	load: {
		key: process.env.VUE_APP_GMAPS_API_KEY,
	}
})

const store = createStore()

store.registerModule('users', users)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
