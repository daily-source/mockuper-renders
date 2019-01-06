import '@babel/polyfill'
import Vue from 'vue';
import Datetime from 'vue-datetime';
import * as VueGoogleMaps from 'vue2-google-maps'
import VueYoutube from 'vue-youtube'

import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import * as filters from "./xthon-core/lib/util/filters"
import SmoothScroll from 'Components/plugins/SmoothScroll';
// You need a specific loader for CSS files
// import 'vue-datetime/dist/vue-datetime.css';

import { createStore } from './xthon-core/lib/store'
import users from './store/modules/user'
import nonprofits from './store/modules/nonprofits'
import video from './store/modules/video'

Vue.config.productionTip = false;

Vue.use(Datetime)
Vue.use(VueYoutube)

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
store.registerModule('nonprofits', nonprofits)
store.registerModule('video', video)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
