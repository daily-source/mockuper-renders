const state = {
  nonprofitIRS: '',
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

  /**
   * Sets the `nonprofitIRS` value
   */
  setNonprofitIRS (state, nonprofit) {
    state.nonprofitIRS = nonprofit
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