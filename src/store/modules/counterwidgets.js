import { random } from 'lodash'

const state = {
  widgets: [
    {
      id: 1,
      featuredImg: 0,
      counterId: 1,
      rate: 3,
      title: '',
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
  },

  counters: [
    {
      id: 1,
      title: 'Deaths now occuring from malnutrition and dirty water.',
      rate: 3,
      imgPreviews: [
        'page-image-1.jpeg',
        'page-image-2.jpg',
        'page-image-3.jpg',
        'page-image-4.jpg',
      ]
    },
    {
      id: 2,
      title: 'Deaths now occuring from extreme poverty',
      rate: 1327,
      imgPreviews: [
        'page-image-1.jpeg',
        'page-image-2.jpg',
        'page-image-3.jpg',
        'page-image-4.jpg',
      ]
    }
  ],
}

const getters = {}

const actions = {
   addWidget ({ commit, state }, widget) {
    if (!widget) return
    const id = random(1000, 10000, false)

    const widgetData = {
      id,
      ...widget
    }

    commit('setWidgets', [
      ...state.widgets,
      widgetData
    ])

    return widgetData
  },
}

const mutations = {
  setWidgets (state, widgets) {
    state.widgets = widgets
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}