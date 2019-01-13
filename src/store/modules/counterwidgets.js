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
      themeId: 0,
    },
    {
      id: 2,
      featuredImg: 2,
      counterId: 2,
      rate: 4,
      message: 'This is a custom message.',
      userId: 1,
      themeId: 1,
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

  colors: [
    'primary',
    'secondary',
  ],

  backgroundImages: [
    'statue-of-liberty.jpg',
    'mlk.jpg',
    'poor-kid.jpg',
  ],

  // A background image ID of null means that no background image is to be displayed
  // One background image is to one color only for now.
  counters: [
    {
      id: 1,
      title: 'Deaths now occuring from malnutrition and dirty water:',
      rate: 3,
      themes: [
        {
          colorId: 0,
          backgroundImageId: 0,
        },
        {
          colorId: 0,
          backgroundImageId: 1,
        },
        {
          colorId: 1,
          backgroundImageId: 2,
          logoPosition: 'right',
        },
        {
          colorId: 1,
          backgroundImageId: null,
        }
      ],
    },
    {
      id: 2,
      title: 'Deaths now occuring from extreme poverty:',
      rate: 1327,
      themes: [
        {
          colorId: 0,
          backgroundImageId: 0,
        },
        {
          colorId: 0,
          backgroundImageId: 1,
        },
        {
          colorId: 1,
          backgroundImageId: 2,
        },
        {
          colorId: 1,
          backgroundImageId: null,
        }
      ],
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
