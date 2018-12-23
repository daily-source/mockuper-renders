const state = {
  widgets: [
    {
      id: '1',
      featuredImg: 0,
      title: 'Deaths now occurring from malnutrition and dirty water:',
      rate: 3,
      message: '', 
    }
  ],

  imgs: [
    'statue-of-liberty.jpg',
    'mlk-sm.jpg',
    'poor-kid.jpg',
  ],

  sizes: {
    'large': {
      label: 'Large',
      width: 800,
    },
    'medium': {
      label: 'Medium',
      width: 500,
    },
    'small': {
      label: 'Small',
      width: 300,
    }
  },

  colors: {
    'black-and-white': {
      label: 'Black and White',
      primary: '#000',
      secondary: '#fff',
    }
  }
}

const getters = {}

const actions = {}

const mutations = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}