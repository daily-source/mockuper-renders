import { mapState } from 'vuex'
import VersionSwitcherView from './components/VersionSwitcher'
import VersionedComponent from './components/VersionedComponent'
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
    // Vue.component('versioned-component', VersionedComponent)

    registerModule(store)

    Vue.mixin({
      computed: {
        ...mapState({
          $version: state => state.versionSwitcher.version
        })
      },
    })
  }
}

export default VersionSwitcher