const state = {
  filter: '',
}

const actions = {}

const mutations = {
  /**
   * Sets the filter value
   * 
   * @param {String} filter The filter value
   */
  setFilter (state, filter) {
    state.filter = filter
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}