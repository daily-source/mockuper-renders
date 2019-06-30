import { mapState } from 'vuex'
import VersionSwitcherView from './components/VersionSwitcher'
import { registerModule } from './store'

const VersionSwitcher = {
  install (Vue, store, options = {}) {
    /**
     * Make sure that the plugin is installed only once
     */
    if (this.installed) {
      return
    }

    this.installed = true

    Vue.component('version-switcher', VersionSwitcherView)

    registerModule(store)

    Vue.mixin({
      computed: {
        ...mapState({
          $version: state => state.versionSwitcher.version
        })
      },

      mounted () {
        console.log(this.$route.query.version)
      },
    })
  }
}

export default VersionSwitcher