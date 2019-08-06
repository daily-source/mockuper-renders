const state = {
  data: [
    {
      userId: 1,
      name: 'Giving up candy for 3 months',
      goal: 240,
      raised: 150,
    },
    {
      userId: 2,
      name: 'Skipping bathroom renovation',
      goal: 2250,
      raised: 520,
    },
    {
      userId: 3,
      name: 'Spending way less on my next car',
      goal: 1650,
      raised: 340,
    },
    {
      userId: 4,
      name: 'Goodbye Soda',
      goal: 120,
      raised: 70,
    },
    {
      userId: 5,
      name: 'I will live simply so others may live',
      goal: 275,
      raised: 70,
    },
    {
      userId: 6,
      name: 'I Can Do Without Netflix',
      goal: 180,
      raised: 65,
    },
    {
      userId: 7,
      name: 'No new clothes for a year',
      goal: 280,
      raised: 125,
    },
    {
      userId: 12,
      name: 'No meals higher than $10 for six months',
      goal: 0,
      raised: 0,
    },
    {
      userId: 11,
      name: 'Staycation so I can give more ',
      goal: 0,
      raised: 0,
    },
    {
      userId: 10,
      name: 'Cutting car washes in half',
      goal: 0,
      raised: 0,
    },
    {
      userId: 9,
      name: 'Enough is enough, so others have enough ',
      goal: 0,
      raised: 0,
    },
    {
      userId: 8,
      name: 'Down to 1 cup a day to help the poor',
      goal: 0,
      raised: 0,
    },
  ]
}

const actions = {

}

const getters = {
  userFundraisers: (state) => (id) => {
    return state.data.filter(userFundraiser => userFundraiser.userId === id)
  },

  recentFundraisers: state => {
    return state.data.slice(state.data.length - 5).reverse()
  },
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