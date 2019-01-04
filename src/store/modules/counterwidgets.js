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
    },
    {
      id: 2,
      featuredImg: 1,
      counterId: 2,
      rate: 4,
      title: 'This is a custom title.',
      message: 'This is a custom message.',
			userId: 1,
    },
  ],

	pages: [
		{
			id: 1,
			widgetId: 1,
			userId: 1,
		},
		{
			id: 2,
			widgetId: 2,
			userId: 1,
		},
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
				'statue-of-liberty.jpg',
				'mlk-sm.jpg',
				'poor-kid.jpg',
      ]
    },
    {
      id: 2,
      title: 'Deaths now occuring from extreme poverty',
      rate: 1327,
      imgPreviews: [
				'statue-of-liberty.jpg',
				'mlk-sm.jpg',
				'poor-kid.jpg',
      ]
    }
  ],
}

const getters = {}

const actions = {
  async addWidget ({ commit, state }, widget) {
    if (!widget) return
    const id = random(1000, 10000, false)

    const widgetData = {
      id,
      ...widget
    }

    commit('addWidget', widgetData)

    return widgetData
  },

	async createPage ({ state, commit, dispatch }, widget) {
		let pageData

		try {
			const widgetData = await dispatch('addWidget', widget)
			const id = random(1000, 10000, false)

			pageData = {
				id,
				widgetId: widgetData.id
			}

			commit('addPage', pageData)
		} catch (err) {
			console.log(err)
		}

		return pageData
	}
}

const mutations = {
	addWidget(state, widget) {
		state.widgets = [
			...state.widgets,
			widget
		]

		return widget
	},

	addPage (state, page) {
		state.pages = [
			...state.pages,
			page,
		]
	}
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
