const state = {
  opened: true,
}

const actions = {
  /**
   * Closes the info notification.
   */
  closeInfo ({ commit }) {
    commit('setInfo', false)
  },

  /**
   * Opens the info notification.
   */
  openInfo ({ commit }) {
    commit('setInfo', true)
  },
}

const mutations = {
  /**
   * Sets the state of the info.
   * 
   * @param {Object} state 
   * @param {Boolean} infoState The state of the info
   */
  setInfo (state, infoState) {
    state.opened = infoState
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}