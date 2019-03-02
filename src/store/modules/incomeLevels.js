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
	'Cell phone/smartphone',
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

// Photos should be in this order.
// ['Housing Photo', 'Transporation photo']

const state = {
  data: [
    {
			name: 'Top 10%: Over $22,000',
			percent: '10%',
			value: '22,000',
      descriptionList: [
        'About 80% of the U.S.',
        'Most of Western Europe, Canada, Japan, South Korea & Australia',
        'A little of Eastern Europe',
        'A tiny percentage of other regions',
      ],
      have: [...haveDefault, ...dontHaveDefault],
      dontHave: [],
      photos: [
        'working-class-ranch-house.jpg',
        'southwest-airlines-boeing.jpg',
      ], 
    },
    {
			name: 'Top 20%: Over $10,000',
			percent: '20%',
			value: '10,000',
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
			percent: '30%',
			value: '5,100',
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
				'nice-bus-america.jpg',
      ],
    },
    {
      name: 'Top 40%: Over $3,200',
			percent: '40%',
			value: '3,200',
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
				'crowded-motorscooter.jpg',
      ],
    },
    {
      name: 'Bottom 40%: Under $1,830',
			percent: '40%',
			value: '1,830',
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
				'third-world-school-bus.jpg',
      ],
    },
    {
      name: 'Bottom 30%: Under $1,350',
			percent: '30%',
			value: '1,350',
      descriptionList: [
        'None are in the U.S. or other industrialized countries',
        'Some of Asia, Latin America and the Middle East',
        'Much of Africa and India',
      ],
      have: haveDefault,
      dontHave: dontHaveDefault,
      photos: [
				'sheet-metal-shack.jpg',
				'mule.jpg',
      ],
    },
    {
      name: 'Bottom 20%: Under $955',
			percent: '20%',
			value: '955',
      descriptionList: [
        'Most are in Africa and South Asia(India, Bangladesh and Pakistan).',
        'Some of Asia, Latin America and the Middle East',
				'Much of Africa and India',
				'None are in the U.S. or other',
      ],
      have: [],
      dontHave: [...haveDefault, ...dontHaveDefault],
      photos: [
				'makeshift-metal.jpg',
				'draggable-cart-on-wheels.jpg',
      ],
    },
    {
      name: 'Bottom 10%: Under $590',
			percent: '10%',
			value: '590',
			descriptionList: [
				'Most are in Africa and South Asia (India, Bangladesh and Pakistan).',
				'A portion are in other parts of Asia',
				'They are rarely in Latin America and the Caribbean, except for Haiti.',
				'None are in the U.S. or other industrialized countries',
      ],
      have: [],
      dontHave: [...haveDefault, ...dontHaveDefault],
      photos: [
				'makeshift-nonmetal.jpg',
				'large-water-jugs-on-head.jpg',
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
