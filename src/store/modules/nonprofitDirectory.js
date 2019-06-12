const state = {
  sortBy: 'country'
}

const actions = {
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
