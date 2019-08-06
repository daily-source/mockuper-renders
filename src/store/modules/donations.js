const state = {
  data: [
    {
      userId: 13,
      featuredDonation: true,
      amount: 80,
    },
    {
      userId: 14,
      featuredDonation: true,
      amount: 60,
      message: 'Good you’re doing this. I’m happy to support your efforts.',
    },
    {
      userId: 15,
      featuredDonation: true,
      amount: 80,
      message: 'Glad to help!',
    },
    {
      userId: 16,
      featuredDonation: true,
      amount: 50,
      message: 'Aunt Jean, I’m cheering you on. Love, Karen.',
    },
    {
      amount: 45,
      featuredDonation: true,
    },
    {
      userId: 23,
      featuredDonation: true,
      amount: 10,
      date: 'Sept 30, 2018',
      message: "You're doing a great thing, keep it up!",
    },
    {
      userId: 22,
      featuredDonation: true,
      amount: 60,
      date: 'Sept 30, 2018',
      message: 'Great idea. God bless you.',
    },
    {
      amount: 10,
      date: 'Sept 30, 2018',
    },
    {
      userId: 21,
      amount: 20,
      date: 'Sept 30, 2018',
    },
    {
      userId: 20,
      amount: 20,
      date: 'Sept 30, 2018',
    },
    {
      amount: 10,
      date: 'Aug 1,2018',
      message: 'Phil, soda is bad for you anyway! Rock on.',
    },
    {
      userId: 19,
      amount: 10,
      date: 'Aug 1,2018',
      message: 'Glad to help.',
    },
    {
      userId: 18,
      amount: 50,
      date: 'Aug 4,2018',
      message: 'Glad to help.',
    },
    {
      userId: 17,
      amount: 10,
      date: 'Aug 5,2018',
      message: 'Good luck with your fundraiser Susan!',
    },
  ]
}

const actions = {

}

const getters = {
  getFeaturedDonations: state => {
    return state.data.filter(donation => donation.featuredDonation)
  },

  recentDonations: state => {
    return state.data.slice(state.data.length - 9).reverse()
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
