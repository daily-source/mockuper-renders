import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import users from './modules/users'
import fundraisers from './modules/fundraisers'
import userFundraisers from './modules/userFundraisers'
import donations from './modules/donations'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    fundraisers,
    users,
    userFundraisers,
    donations,
  },
})
