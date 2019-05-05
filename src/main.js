import '@babel/polyfill'
import Vue from 'vue';
import Datetime from 'vue-datetime';
import VueYoutube from 'vue-youtube'
import * as VueGoogleMaps from 'vue2-google-maps'
import VTooltip from 'v-tooltip'

import store from './store'
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import * as filters from "./xthon-core/lib/util/filters"
import SmoothScroll from 'Components/plugins/SmoothScroll';
// You need a specific loader for CSS files
// import 'vue-datetime/dist/vue-datetime.css';

Vue.config.productionTip = false;

Vue.use(Datetime)
Vue.use(VTooltip)


// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAPS_API_KEY,
    libraries: 'places'
  }
})
Vue.use(VueYoutube)

router.beforeEach((to, from, next) => {
  store.dispatch('navbar/closeNavbar')

  if (to.name !== 'home') {
    store.dispatch('video/stopVideo')
    store.dispatch('video/hideVideo')

    next()
    return
  }

  /**
   * If from.name is `null` and from.path is `/`, this means that we visited the
   * site on the home page, therefore we should play the video.
   */
  if (!from.name && from.path === '/') {
    // store.dispatch('video/playVideo')
    store.dispatch('splash/showSplash')    
  }

  next()
})

Vue.use(SmoothScroll);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
