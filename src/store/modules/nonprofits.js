const baseURL = process.env.VUE_APP_BASE_URL

const state = {
	data: [
		{
			id: 1,
			country:"Heard Island and McDonald Islands",
			description:"Rerum velit officia.",
			loction:"461 Hermann Greens Apt. 847",
			name:"Oxfam International",
			picture: `${baseURL}img/oxfam.png`,
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
				{
					id: 4,
					country: 'Canada',
					state: 'Saskatchewan',
					city: 'Cupar',
					location: '206  St. John Street, Cupar, Saskatchewan, Canada',
					latitude: 53.130783359941844,
					longitude: -106.310546875,
				},
			],
		},
		{	
			country:"Grenada",
			description:"Repellat quia provident eius est aut.",
			id: 2,
			loction:"37537 Jennifer Pass Suite 365",
			name:"International Justice Mission",
			picture: `${baseURL}img/ijm.png`,			
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
					longitude: -56.0210109172757,
					latitude: -9.063321460334844,
				},
				{
					id: 3,
					country: 'Bangladesh',
					state: '199, Tejgaon I/A',
					city: 'Dhaka',
					location: '199, Tejgaon I/A, Dhaka, Bangladesh',
					longitude: 90.916015625,
					latitude: 24.102377387370506,
				}
			],
		},
		{
			country:"Nigeria",
			description:"Voluptatibus blanditiis quae.",
			id:3,
			name:"KIVA",
			picture: `${baseURL}img/kiva.jpg`,						
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
					country: 'Ethiopia',
					state: 'Addis Ababa',
					city: 'Addis Ababa',
					street: 'P.O.Box 15388',
					location: 'P.O.Box 15388, Addis Ababa, Ethiopia',
					longitude: 39.84570701948269,
					latitude: 8.15030692292331,
				},
				{
					id: 4,
					country: 'Nigeria',
					street: '62, Seriki Aro Avenue',
					city: 'Ikeja',
					State: 'Lagos',
					location: '62, Seriki Aro Avenue, Ikeja, Lagos, Nigeria',
					latitude: 7.92404181555562,
					longitude: 8.842270332724297,
				}
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
