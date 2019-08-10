import _ from 'lodash'

import fundraisers from "Components/MaximumGood/fundraisers"
import forThePoorSites from "Components/ForThePoor/sites"
import forTheEarthSites from "Components/ForTheEarth/sites"

function normalizeSite (sites) {
  return sites.map(site => {
    return {
      id: _.kebabCase(site.name),
      imgName: site.image,
      name: site.name,
    }
  })
}

const state = {
  data: {
    ...fundraisers,
    'help-the-poorest-half': {
      label: 'Help the Poorest Half',
      sites: normalizeSite(forThePoorSites),
    },
    'help-the-earth': {
      label: 'Help The Earth',
      sites: normalizeSite(forTheEarthSites),
    },
    "do-good-together": {
      label: "Do Good Together",
      sites: [
        {
          id: 'churches-for-good',
          name: "Churches for Good",
          imgName: "churches-for-good.png",
        },
        {
          id: 'leagues-for-good',
          name: "Leagues for Good",
          imgName: "leagues-for-good.png",
        },
        {
          id: 'colleges-for-good',
          name: "Colleges for Good",
          imgName: "colleges-for-good.png",
        },
        {
          id: 'businesses-for-good',
          name: "Businesses for Good",
          imgName: "business-for-good.png",
        },
        {
          id: 'schools-for-good',
          name: "Schools for Good",
          imgName: "schools-for-good.png"
        },
        {
          id: 'families-for-good',
          name: "Families for Good",
          imgName: "families-for-good.png",
        },
        {
          id: 'knights-of-columbus',
          name: "Knights of Columbis",
          imgName: "knights-of-columbus.png",
        },
      ]
    },
    "free-modern-day-slaves": {
      label: "Free Modern-Day Slaves",
      sites: [
        {
          id: 'stands-for-freedom',
          name: "Stands for Freedom",
          imgName: "stands-for-freedom.png",
        },
        {
          id: 'freeathon',
          name: "Freeathon",
          imgName: "freeathon.png",
        },
        {
          id: 'virtual-railroad',
          name: "Virtual Railroad",
          imgName: "virtual-railroad.png",
        },
        {
          id: 'conscience-or-cotton',
          name: "Conscience or Cotton",
          imgName: 'conscience-or-cotton.png',
        },
        {
          id: 'the-modern-emancipation-proclamation',
          name: "The Modern Emancipation Proclamation",
          imgName: "the-modern-emancipation-proclamation.png",
        },
        {
          id: 'see-our-slaves',
          name: "See Our Slaves",
          imgName: 'see-our-slaves.png',
        }
      ]
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
