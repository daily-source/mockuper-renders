const state = {
  data: [
    {
      id: 1,
      email: 'rolf.hegdal@example.com',
      firstName: 'Rolf',
      lastName: 'Hegdal',
      street: '346 Ljan Terrase',
      city: 'Vear',
      state: 'Rogaland',
      zip: '3095',
      country: 'Hawaii',
      phone: '(246)-131-2874',
      loggedIn: false,
    },
    {
      id: 2,
      email: 'bruce.west62@example.com',
      firstName: 'Bruce',
      lastName: 'West',
      street: '8739 Lovers Ln',
      city: 'Dallas',
      state: 'Texas',
      zip: '75225',
      country: 'USA',
      phone: '(848)-404-4517',
      loggedIn: false,
    },
  ]
}

const getters = {}

const actions = {}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}