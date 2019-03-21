import Fundraisers from "./defaultFundraisers"

const state = {
  data: Fundraisers
}

const mutations = {

}

const actions = {

}

const getters  = {
  getFundraiser: state => (category, id) => {
    return state.data[category].sites.find(site => site.id === id)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
