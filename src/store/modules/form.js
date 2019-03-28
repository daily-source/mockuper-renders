const state = {
  data: {
    veryRich: { 
      percentage: 0,
      donationAmount: 0,
    },
    rich: { 
      percentage: 0,
      donationAmount: 0,
    },
    middleClass: { 
      percentage: 0,
      donationAmount: 0,
    },
    poor: { 
      percentage: 0,
      donationAmount: 0,
    },
    veryPoor: { 
      percentage: 0,
      donationAmount: 0,
    },
  }
}

const getters = {}

const actions = {
  /**
   * Sets the percentage for a specific percentile
   * 
   * @param {String} key The key on what percentage amount to change 
   */
  setPercentage ({ commit }, payload) {
    commit('setPercentilePercentage', payload)
  },

  /**
   * Sets the donation amount for a specific percentile
   * 
   * @param {String} key The key on what donation amount to change 
   */
  setDonationAmount ({ commit }, payload) {
    commit('setPercentileDonationAmount', payload)
  },

  resetPercentiles () {
    
  }
}

const mutations = {
  setPercentilePercentage (state, payload) {
    if (!state.data[payload.key]) return
    
    state.data[payload.key].percentage = parseInt(payload.percentage)
  },

  setPercentileDonationAmount (state, payload) {
    if (!state.data[payload.key]) return

    state.data[payload.key].donationAmount = parseInt(payload.donationAmount)
  }
} 

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}