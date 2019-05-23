const state = {
  navbarOpened: false,
}

const getters = {}

const actions = {
  /**
   * Toggles the navbar
   */
  toggleNavbar ({ state, commit }) {
    commit('setNavbarState', !state.navbarOpened)
  },

  /**
   * Closes the navbar
   */
  closeNavbar ({state, commit}) {
    console.log('close navbar')
    commit('setNavbarState', false)
  },
}

const mutations = {
  /**
   * Sets the navbar state
   */
  setNavbarState (state, navbarState) {
    state.navbarOpened = navbarState
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}