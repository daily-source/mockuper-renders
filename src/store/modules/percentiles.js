import data from '@/data.csv'

const getPercentiles = () => {
  let res = [];

  data.map(item => {
    if( item.length > 0 ) {
      res[item[0]] = item[1] 
    }
  })

  return res;
}

const state = {
  data: [
    ...getPercentiles(),
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