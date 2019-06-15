const state = {
  sortBy: 'country',
  filter: '',
}

const actions = {
  /**
   * Sets the filter value
   */
  setFilterValue ({ commit }, filter) {
    commit('setFilter', filter)
  },

  resetFilter ({ commit }, filter) {
    commit('setFilter', '')
  },

  setSortToByName({ commit }) {
    /**
     * TODO: Make an error dispatch when it is not a valid sort name
     */
    commit('setSortBy', 'name')
  },

  setSortToByCountry({ commit }) {
    /**
     * TODO: Make an error dispatch when it is not a valid sort name
     */
    commit('setSortBy', 'country')
  },
}

const mutations = {
  setSortBy(state, sortBy) {
    state.sortBy = sortBy
  },

  setFilter(state, filter) {
    state.filter = filter
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
  getters,
}
