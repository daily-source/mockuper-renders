const state = {
  isPlaying: false,
  videoId: null,
}

const getters = {}

const actions = {
  toggleIsPlaying ({state, commit}) {
    commit('setIsPlaying', !state.isPlaying)
  },
}

const mutations = {
  setIsPlaying (state, playing) {
    state.isPlaying = playing
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
