const state = {
	data: [
		{
			id: 1,
			country:"Heard Island and McDonald Islands",
			description:"Rerum velit officia.",
			latitude: 69.0293,
			location: -152.9696,
			loction:"461 Hermann Greens Apt. 847",
			longitude:-85.2878,
			name:"Wisozk, Gutkowski and Lind",
			picture:"http://lorempixel.com/640/480/business",
			state:"Kansas",
			url:"https://titus.net",
			locations: [
				{
					id: 1,
					country: 'India',
					city: 'Mumbai',
					state: 'Maharastra',
					street: 'Candies, Bandra West, Mumbai, Maharastra, India',
					latitude: 19.075983,
					longitude: 72.877655,
				},
				{
					id: 2,
					location: 'Fr. Agnel Schoolm KJhora Colony, Sector 62A, Noida Uttar Pradesh, India',
					latitude: 28.535517,
					longitude: 77.391029,
				},
				{
					id: 3,
					location: '29, Poonam Kirti,poonam Nayar, Mahakali Caves Rd, Andheri(e), Poonam Nayar, Poonam Kirti, India',
					latitude: 21.168190,
					longitude: 72.814280,
				},
			],
		},
		{	
			country:"Grenada",
			description:"Repellat quia provident eius est aut.",
			id: 2,
			loction:"37537 Jennifer Pass Suite 365",
			name:"Hagenes LLC",
			picture:"http://lorempixel.com/640/480/business",
			url:"http://miracle.info",
			locations: [
				{
					id: 1,
					location: 'Los Angeles, California, USA',
					latitude: 34.052235,
					longitude: -118.243683,
				},
				{
					id: 2,
					location: 'Santos, Sao Paulo, Brazil',
					longitude: -46.326462,
					latitude: -23.956289,
				},
			],
		},
		{
			country:"Kiribati",
			description:"Voluptatibus blanditiis quae.",
			id:3,
			latitude: 29.7716,
			loction:"984 Marks Shore Apt. 110",
			longitude: 69.5147,
			name:"Pfannerstill and Sons",
			picture:"http://lorempixel.com/640/480/business",
			state:"New Hampshire",
			url:"http://eileen.com",
			locations: [
				{
					id: 1,
					location: 'London, United Kingdom, England',
					latitude: 51.507351,
					longitude: -0.127758,
				},
				{
					id: 2,
					location: 'Tokyo, Japan',
					latitude: 35.689487,
					longitude: 139.691711,
				},
			],
		},
	]
}

const getters = {}

const actions = {
	registerNonprofit({state, commit}, nonprofit) {
		// This is just a mock way to generate an ID.
		const id = state.data.length + 1

		const newNonprofit = {
			id,
			...nonprofit
		}

		commit('add', newNonprofit)

		return newNonprofit
	},
}

const mutations = {
	add (state, nonprofitData) {
		state.data = [
			...state.data,
			nonprofitData,
		]
	},
}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}
