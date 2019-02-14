const state = {
	data: [
		{
			id: 1,
			firstName: 'Arianna',
			lastName: 'Simmons',
			userName: 'arianna.simmons21',
			latitude: 36.2418215,
			longitude: -115.2973598,
			picture: 'https://randomuser.me/api/portraits/women/30.jpg',
			about: 'This is a sample about.',
			nonprofits: [
				{
					nonprofitId: 1,
					locationId: 1,
				},
				{
					nonprofitId: 2,
					locationId: 1,
				},			
			],
		},
		{
			id: 2,
			firstName: 'Maureen',
			lastName: 'Vargas',
			userName: 'maureen.vargas24',
			latitude: 32.8654397,
			longitude: 13.114743,
			picture: 'https://randomuser.me/api/portraits/women/26.jpg',
			about: 'This is a sample about.',
			nonprofits: [
				{
					nonprofitId: 2,
					locationId: 1,
				},
				{
					nonprofitId: 2,
					locationId: 2,
				},			
			],
			location: 'Tripoli',
		},
		{
			id: 3,
			firstName: 'Akaath',
			lastName: 'Bhadare',
			userName: 'akaath.bhadare1',
			latitude: 38.9053578,
			longitude: -2.0031373,
			picture: 'https://randomuser.me/api/portraits/men/88.jpg',
			about: 'This is a sample about.',
			nonprofits: [
				{
					nonprofitId: 1,
					locationId: 2,
				},
				{
					nonprofitId: 2,
					locationId: 1,
				},			
			],
			location: 'Madrid, Spain',
		},
		{
			id: 4,
			firstName: 'Ji-hae',
			lastName: 'Mok',
			userName: 'jihae.mok98',
			latitude: 37.6522776,
			longitude: 127.0871966,
			picture: 'https://randomuser.me/api/portraits/men/10.jpg',
			about: 'This is a sample about.',
			nonprofits: [
				{
					nonprofitId: 3,
					locationId: 2,
				},
				{
					nonprofitId: 1,
					locationId: 3,
				},			
			],
			location: 'Seoul, South Korea',
		},
		{
			id: 5,
			firstName: 'Lynn',
			lastName: 'Hylton',
			userName: 'lynnhylton231',
			latitude: 61.874665228839476,
			longitude: 27.34912109375,
			picture: 'https://randomuser.me/api/portraits/men/10.jpg',
			about: 'This is a sample about.',
			nonprofits: [
				{
					nonprofitId: 2,
					locationId: 1,
				},
				{
					nonprofitId: 3,
					locationId: 3,
				},
				{
					nonprofitId: 1,
					locationId: 4,
				},					
			],
			location: 'Kluuvikatu 26, VANTAA, Uusimaa, Finland',
		},
		{
			id: 6,
			firstName: 'Roberta ',
			lastName: 'Reyes',
			userName: 'roberta.reyes88',
			latitude: 38.69900874944365,
			longitude: -97.345703125,
			picture: 'https://randomuser.me/api/portraits/women/10.jpg',
			about: 'This is a sample about.',
			nonprofits: [
				{
					nonprofitId: 2,
					locationId: 3,
				},					
			],
			location: 'Picher, Kansas, Austria',
		},
	],
	user: null,
	featuredUsers: [5, 6],
}

const getters = {
	/**
	 * Gets the featured users.
	 */
	getFeaturedUsers: state => {
		return state.data.filter(user => {
			return state.featuredUsers.indexOf(user.id) !== -1
		})
	},
}

const actions = {
	updateUser ({ commit }, user) {
		commit('update', user)
	}, 

	registerUser({state, commit}, user) {
		// This is just a mock way to generate an ID.
		const id = state.data.length + 1

		const newUser = {
			id,
			...user
		}

		commit('add', newUser)
		commit('setUser', newUser)

		return newUser
	},
}

const mutations = {
	update (state, user) {
		const newState = state.data.map(rec => {
			if (rec.id === user.id) {
				return user
			} else {
				return rec
			}
		})
		
		state.data = newState
	},

	add (state, userData) {
		state.data = [
			...state.data,
			userData,
		]
	},

	setUser (state, user) {
		state.user = user
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

