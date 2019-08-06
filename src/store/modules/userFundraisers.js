const state = {
  data: [
    {
      userId: 1,
      fundraiserSlug: 'easter-giving',
      name: 'Volunteering 10 hours a week during Easter season',
      goal: 450,
      raised: 175,
      for: 'Feed the Children'
    },
    {
      userId: 2,
      fundraiserSlug: 'fathers-for-good',
      name: 'Tutoring at-risk youth 5 hours a week all year',
      goal: 700,
      raised: 125,
      for: 'Oxam America',
    },
    {
      userId: 3,
      fundraiserSlug: 'quitathon',
      name: 'Quitting smoking to help give life to the poor',
      goal: 1200,
      raised: 400,
      for: 'Oxfam America',
    },
    {
      userId: 4,
      fundraiserSlug: 'volunteerathon',
      name: 'Phil\'s Gonna Clean up Springfield Parks',
      goal: 650,
      raised: 345,
      for: 'Oxfam America',
    },
    {
      userId: 4,
      fundraiserSlug: 'give-it-up-for-good',
      name: 'Goodbye soda!',
      goal: 160,
      raised: 70,
      for: 'Oxfam America',
    },
    {
      userId: 5,
      fundraiserSlug: 'run-for-good',
      name: 'Running 15 miles to Venice for charity',
      goal: 1100,
      raised: 70,
      for: 'Oxfam America'
    },
    {
      userId: 5,
      fundraiserSlug: 'give-it-up-for-good',
      name: 'Giving up candy for 3 months',
      goal: 120,
      raised: 20,
      for: 'Sierra Club'
    },
    {
      userId: 6,
      fundraiserSlug: 'vacation-for-good',
      name: 'Doing Staycation in SRQ to help the needy',
      goal: 400,
      raised: 160,
      for: 'Feed the Children'
    },
    {
      userId: 7,
      fundraiserSlug: 'volunteerathon',
      name: 'Serving at food pantry to raise money',
      goal: 320,
      raised: 600,
      for: 'Oxfam America',
    },
    {
      userId: 12,
      fundraiserSlug: 'volunteerathon',
      name: 'Teaching CCD confirmation class this year ',
      goal: 0,
      raised: 0,
    },
    {
      userId: 11,
      fundraiserSlug: 'give-it-up-for-good',
      name: 'No new clothes for six months',
      goal: 0,
      raised: 0,
    },
    {
      userId: 10,
      fundraiserSlug: 'loseathon',
      name: 'Losing 20 pounds so I’m healthier and others can eat',
      goal: 0,
      raised: 0,
    },
    {
      userId: 9,
      fundraiserSlug: 'give-it-up-for-good',
      name: 'Enough is enough, so others have enough ',
      goal: 0,
      raised: 0,
    },
    {
      userId: 8,
      fundraiserSlug: 'volunteerathon',
      name: 'Quitting my chewing gum habit',
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