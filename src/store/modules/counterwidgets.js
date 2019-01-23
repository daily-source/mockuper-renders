import { random } from 'lodash'

const state = {
  widgets: [
    {
      id: 1,
      featuredImg: 0,
      counterId: 1,
      rate: 3,
      message: '',
      userId: 1,
      themeId: 1,
    },
    {
      id: 2,
      featuredImg: 2,
      counterId: 2,
      rate: 4,
      message: 'This is a custom message.',
      userId: 1,
      themeId: 2,
    },
  ],

	pages: [
		{
			id: 1,
			widgetId: 1,
      userId: 1,
      nonprofit: null,
		},
		{
			id: 2,
			widgetId: 2,
			userId: 1,
      nonprofit: {
        ACTIVITY:"Testing products for public safety; Scientific research for government",
        CITY:"CHICAGO",
        CLASSIFICATION:"Charitable Organization; Educational Organization",
        DEDUCTIBILITY:1,
        EIN:521717675,
        NAME:"ACCUTEST INC",
        NTEE_CD:"Health Support Services",
        SORT_NAME:"0",
        STATE:"IL",
        STREET:"PO BOX 71699",
        SUBSECTION:"3",
        ZIP:"60694-1699",
        validated:true,
      },
		},
	],

  sizes: {
    'large': {
      label: 'Large',
      width: 800,
			className: 'large',
    },
    'medium': {
      label: 'Medium',
      width: 500,
			className: 'medium',
    },
    'small': {
      label: 'Small',
      width: 300,
			className: 'small',
    }
  },

  colors: [
    'primary',
    'secondary',
  ],

  backgroundImages: [
    'statue-of-liberty.jpg',
    'mlk.jpg',
    'poor-kid-v1.jpg',
    'statue-of-liberty-v3.jpg',
  ],

  // This is a combination of a color and a background image.
  // Uses the index of the in the array above for now.
  themes: [
    {
      id: 1,
      colorId: 0,
      backgroundImageId: 3,
      name: 'statue-of-liberty',
    },
    {
      id: 2,
      colorId: 0,
      backgroundImageId: 1,
      name: 'mlk',
    },
    {
      id: 3,
      colorId: 1,
      backgroundImageId: 2,
      logoPosition: 'right',
      name: 'kid',
    },
    {
      id: 4,
      colorId: 1,
      backgroundImageId: null,
      name: 'no-image-primary'
    },
  ],

  counters: [
    {
      id: 1,
      title: 'Deaths Occuring Now  From Malnutrition and Dirty Water:',
      rate: 3,
    },
    {
      id: 2,
      title: 'Deaths Occuring Now From Extreme Poverty:',
      rate: 1327,
    },
  ],
}

const getters = {}

const actions = {
  async addWidget ({ commit }, widget) {
    if (!widget) return
    const id = random(1000, 10000, false)

    const widgetData = {
      id,
      ...widget
    }

    commit('addWidget', widgetData)

    return widgetData
  },

	async createPage ({ commit, dispatch }, widget) {
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
			widget,
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
