const state = {
  version: 1,
}

const actions = {}

const mutations = {}

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
    state,
    actions,
    mutations,
    getters,
  })
}
