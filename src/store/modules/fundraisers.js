import fundraisers from "Components/MaximumGood/fundraisers"

const state = {
  data: fundraisers
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
