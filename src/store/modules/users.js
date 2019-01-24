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
			nonprofits: [1, 4, 5,],
			location: '3319 N Dapple Gray Rdpark St',
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
			nonprofits: [1],
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
			nonprofits: [2, 4],
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
			nonprofits: [3, 4, 5],
			location: 'Seoul, South Korea',
		},
		{
			id: 5,
			firstName: 'Lynn',
			lastName: 'Hylton',
			userName: 'lynnhylton231',
			latitude: 47.0744713,
			longitude: 9.922114,
			picture: 'https://randomuser.me/api/portraits/men/10.jpg',
			about: 'This is a sample about.',
			nonprofits: [2, 3, 4],
			location: 'SCHWARZGRUB, Austria',
		},
	]
}

const actions = {
	updateUser ({ commit }, user) {
		console.log(user)
		commit('update', user)
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
}

const getters = {}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

