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
  'banner-photo-1.jpg',
  'banner-photo-2.jpg',
  'banner-photo-3.jpg',
  'banner-photo-4.jpg',
  'banner-photo-5.jpg',
  'banner-photo-6.jpg',
]

Vue.use(BannerSwitcher, store, {bgImages, selected: 4})

new Vue({
  router,
  store,
  render: h => h(App),
  created: () => {
    console.log('Created')
    window.fbAsyncInit = () => {
      FB.init({
        appId      : process.env.VUE_APP_FB_APP_ID,
        xfbml      : true,
        version    : 'v3.2'
      });
   };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}).$mount('#app');
