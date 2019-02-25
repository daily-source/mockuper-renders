const haveDefault = [
  'Electricity',
  'Landline phone',
  'Basic TV',
  'Bicycle',
  'Radio',
  'Mattress',
  'Stove',
  'Etc.',
]

const dontHaveDefault = [
  'Refrigerator',
  'Plumbing',
  'Clean water',
  'Flush toilet',
  'Hot water',
  'Car or Motorcycle',
  'Cell phone or smartphone',
  'Internet connection',
  'Cable TV',
  'Computer',
  'Tablet',
  'CD player',
  'Bluetooth speaker',
  'Camera',
  'Microwave',
  'Oven',
  'Coffee maker',
]

const state = {
  data: [
    {
      name: 'Top 10%: Over $22,000',
      descriptionList: [
        'About 80% of the U.S.',
        'Most of Western Europe, Canada, Japan, South Korea & Australia',
        'A little of Eastern Europe',
        'A tiny percentage of other regions',
      ],
      have: haveDefault,
      dontHave: dontHaveDefault,
      photos: [
        'working-class-ranch-house.jpg',
        'southwest-airlines-boeing.jpg',
      ], 
    },
    {
      name: 'Top 20%: Over $10,000',
      descriptionList: [
        'About 12% of the U.S.',
        'Some of Europe, Canada, Japan, South Korea & Australia ',
        'A small percentage of other regions',
      ],
      have: haveDefault,
      dontHave: dontHaveDefault,
      photos: [
        'top-20-photo-1.jpg',
        'kia-spectra-2008.jpg',
      ],
    },
    {
      name: 'Top 30%: Over $5,100',
      descriptionList: [
        'About 7% of the U.S.',
        'A small portion of Western Europe, Japan, South Korea and Australia',
        'Some of Eastern Europe, Latin America, the Middle East and Asia',
        'A small percentage of Africa and India',
      ],
      have: haveDefault,
      dontHave: dontHaveDefault,
      photos: [
        'dundees-inner-city.jpg',
      ],
    },
    {
      name: 'Top 40%: Over $3,200',
      descriptionList: [
        'About 1% of the U.S.',
        'A tiny portion of Western Europe, Canada,',
        'Japan, South Korea & Australia ',
        'Much of Eastern Europe and Latin America',
        'Some of the Middle East and Asia',
        'A small percentage of Africa and India',
      ],
      have: haveDefault,
      dontHave: dontHaveDefault,
      photos: [
        'DSC06738.jpg',
      ],
    },
    {
      name: 'Bottom 40%: Over $1,830',
      descriptionList: [
        'None in the U.S., Western Europe, Canada, Japan, South Korea & Australia ',
        'A small amount of Eastern Europe',
        'Much of Latin America, Asia and the Middle East',
        'Some of Africa and India',
      ],
      have: haveDefault,
      dontHave: dontHaveDefault,
      photos: [
        'ruralindia.jpg',
      ],
    },
    {
      name: 'Bottom 30%: Over $1,350',
      descriptionList: [
        'None are in the U.S. or other industrialized countries',
        'Some of Asia, Latin America and the Middle East',
        'Much of Africa and India',
      ],
      have: haveDefault,
      dontHave: dontHaveDefault,
      photos: [
        'sheet-metal-shack.jpg',
      ],
    },
  ],
}

const getters = {
  /**
   * Gets the top half of the income levels.
   */
  topHalf: (state) => {
    return state.data.slice(0, 4)
  },

  /**
   * Gets the bottom half of the income levels.
   */
  bottomHalf: (state) => {
    return state.data.slice(4, state.data.length)
  },
}

const actions = {}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
