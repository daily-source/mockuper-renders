const state = {
	data: [
		{
			id: 1,
			country:"Heard Island and McDonald Islands",
			description:"Rerum velit officia.",
			loction:"461 Hermann Greens Apt. 847",
			name:"Wisozk, Gutkowski and Lind",
			picture:"http://lorempixel.com/640/480/business",
			state:"Kansas",
			url:"https://titus.net",
			locations: [
				{
					id: 1,
					country: 'India',
					state: 'Maharastra',
					city: 'Mumbai',
					location: 'Candies, Bandra West, Mumbai, Maharastra, India',
					latitude: 19.075983,
					longitude: 72.877655,
				},
				{
					id: 2,
					country: 'India',
					state: 'Noida Uttar Pradesh',
					city: 'Mumbai',
					location: 'Fr. Agnel Schoolm KJhora Colony, Sector 62A, Noida Uttar Pradesh, India',
					latitude: 28.535517,
					longitude: 77.391029,
				},
				{
					id: 3,
					country: 'India',
					state: 'Poonam Kirti',
					city: 'Poonam Nayar',
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
					country: 'USA',
					state: 'California',
					city: 'Los Angeles',
					location: 'Los Angeles, California, USA',
					latitude: 34.052235,
					longitude: -118.243683,
				},
				{
					id: 2,
					country: 'Brazil',
					state: 'Sao Paulo',
					city: 'Santos',
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
			name:"Pfannerstill and Sons",
			picture:"http://lorempixel.com/640/480/business",
			state:"New Hampshire",
			url:"http://eileen.com",
			locations: [
				{
					id: 1,
					country: 'England',
					state: 'United Kingdom',
					city: 'London',
					location: 'London, United Kingdom, England',
					latitude: 51.507351,
					longitude: -0.127758,
				},
				{
					id: 2,
					country: 'Japan',
					city: 'Tokyo',
					location: 'Tokyo, Japan',
					latitude: 35.689487,
					longitude: 139.691711,
				},
				{
					id: 3,
					country: 'Brazil',
					state: 'Sao Paulo',
					location: 'Santos, Sao Paulo, Brazil',
					longitude: -46.326462,
					latitude: -23.956289,
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
