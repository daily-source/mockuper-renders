import _ from 'lodash'

import fundraisers from "Components/MaximumGood/fundraisers"
import forThePoorSites from "Components/ForThePoor/sites"

const forThePoorSitesTransformed = forThePoorSites.map(site => {
  return {
    id: _.kebabCase(site.name),
    imgName: site.image,
    name: site.name,
  }
})

const state = {
  data: {
    ...fundraisers,
    'help-the-poorest-half': {
      label: 'Help the Poorest Half',
      sites: forThePoorSitesTransformed,
    },
  }
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
