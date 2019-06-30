const state = {
  version: 1,
}

const actions = {
  /**
   * Changes the site version
   * 
   * @param {Number} version The site version
   */
  setSiteVersion ({ commit }, version) {
    commit('setVersion', version)
  }
}

const mutations = {
  /**
   * Stores the site's version to the store
   * 
   * @param {Number} version 
   */
  setVersion (state, version) {
    state.version = version
  }
}

const getters = {}

/**
 * Register module function
 * 
 * @param store Vuex store
 */
export const registerModule = (store) => {
  // Check if registermodule is a function
  if (typeof store.registerModule !== 'function') return


  store.registerModule ('versionSwitcher', {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
  })
}
