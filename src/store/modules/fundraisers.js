const state = {
  data: [
    {
      slug: 'easter-giving',
      name: 'Easter Giving',
      imgName: 'good-with-easter-giving.png',
    },
    {
      slug: 'fathers-for-good',
      name: 'Father for Good',
      imgName: 'fathers-for-good.png',
    },
    {
      slug: 'quitathon',
      name: 'Quitathon',
      imgName: 'quitathon.png',
    },
    {
      slug: 'volunteerathon',
      name: 'Volunteerathon',
      imgName: 'volunteerathon.png',
    },
    {
      slug: 'give-it-up-for-good',
      name: 'Give It Up for Good',
      imgName: 'giveitupforgood.png',
    },
    {
      slug: 'run-for-good',
      name: 'Run for Good',
      imgName: 'run-for-good.png',
    },
    {
      slug: 'vacation-for-good',
      name: 'Vacation for Good',
      imgName: 'vacation-for-good.png',
    },
    {
      slug: 'loseathon',
      name: 'Loseathon',
      imgName: 'loseathon.png',
    },
  ]
}

const actions = {

}

const getters = {
  getFundraiser: (state) => (slug) => {
    return state.data.find(fundraiser => fundraiser.slug === slug)
  }
}

const mutations = {

}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
