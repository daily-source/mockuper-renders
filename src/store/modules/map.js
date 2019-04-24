const validMapStyles = ['default', 'dark']

const state = {
  mapStyle: 'default',
}

const actions = {
  changeMapStyle ({commit, state}, mapStyle) {
    console.log('changeMapStyle')
    let style = 'default'

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