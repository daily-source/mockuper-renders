const state = {
	isShown: true,
}

const getters = {}

const actions = {
  toggleIsShown ({state, commit}) {
    commit('setIsShown', !state.isShown)
  },

	showSplash ({commit}) {
		commit('setIsShown', true)
	},

	hideSplash ({commit}) {
		commit('setIsShown', false)
  },
}

const mutations = {  
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
