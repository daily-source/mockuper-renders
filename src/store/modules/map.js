const validMapStyles = ['light', 'dark']

const state = {
  mapStyle: 'dark',
}

const actions = {
  changeMapStyle ({commit, state}, mapStyle) {
    let style = 'light'

    if (validMapStyles.indexOf(mapStyle)) {
      style = mapStyle
    }

    commit('changeMapStyle', style)
  }
}

const getters = {}

const mutations = {
  changeMapStyle (state, mapStyle) {
    state.mapStyle = mapStyle
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}