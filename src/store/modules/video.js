const state = {
  isPlaying: false,
	isShown: true,
  videoId: null,
}

const getters = {}

const actions = {
  toggleIsPlaying ({state, commit}) {
    commit('setIsPlaying', !state.isPlaying)
  },

  toggleIsShown ({state, commit}) {
    commit('setIsShown', !state.isShown)
  },

	showVideo ({commit}) {
		commit('setIsShown', true)
	},

	hideVideo ({commit}) {
		commit('setIsShown', false)
  },
  
  playVideo ({commit}) {
		commit('setIsPlaying', true)
  },

  stopVideo ({commit}) {
		commit('setIsPlaying', false)
  },
}

const mutations = {
  setIsPlaying (state, playing) {
    state.isPlaying = playing
  },
  
  setIsShown (state, shown) {
    state.isShown = shown
  },
}

export default {
	namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
