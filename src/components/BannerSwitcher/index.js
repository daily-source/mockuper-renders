import DynamicBanner from './components/DynamicBanner.vue'
import BannerSwitcherView from './components/BannerSwitcherView.vue'
import { registerModule } from './store'

const BannerSwitcher = {
  install (Vue, store, options = {}) {
    /**
     * Make sure that the plugin is installed only once
     */
    if (this.installed) {
      return
    }

    this.installed = true

    // Register components
    Vue.component('dynamic-banner', DynamicBanner)
    Vue.component('banner-switcher', BannerSwitcherView)

    // Register the background images in the store
    registerModule (store, options.bgImages, options.selected)
  }
}

export default BannerSwitcher