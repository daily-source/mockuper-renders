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
			latitude: 55.5807482,
			longitude: 36.8251476,
			picture: 'https://randomuser.me/api/portraits/men/88.jpg',
			about: 'This is a sample about.',
			nonprofits: [
				{
					nonprofitId: 4,
					locationId: 2,
				},
				{
					nonprofitId: 2,
					locationId: 1,
				},			
			],
			location: 'Moscow, Russia',
		},
		{
			id: 4,
			firstName: 'Ji-hae',
			lastName: 'Mok',
			userName: 'jihae.mok98',
			latitude: 37.6522776,
			longitude: 127.0871966,
			picture: 'https://randomuser.me/api/portraits/men/24.jpg',
			about: 'This is a sample about.',
			nonprofits: [
				{
					nonprofitId: 3,
					locationId: 2,
				},
				{
					nonprofitId: 8,
					locationId: 2,
				},			
			],
			location: 'Seoul, South Korea',
		},
		{
			id: 5,
			firstName: 'George',
			lastName: 'Angelos',
			userName: 'georgeangelos321',
			latitude: 36.36362956455485,
			longitude: 21.65094082270548,
			picture: 'https://randomuser.me/api/portraits/men/82.jpg',
			about: 'This is a sample about.',
			nonprofits: [
				{
					nonprofitId: 1,
					locationId: 1,
				},
				{
					nonprofitId: 6,
					locationId: 2,
				},		
			],
			location: '24300 Trifilia (Chrisanoupolis), Chrisanoupolis, Filiatra Trifilia Greece',
		},
		{
			id: 6,
			firstName: 'Karen',
			lastName: 'Stevens',
			userName: 'karent.stevens88',
			latitude: 38.69900874944365,
			longitude: -97.345703125,
			picture: 'https://randomuser.me/api/portraits/women/10.jpg',
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
				{
					nonprofitId: 3,
					locationId: 3,
				},
			],
			location: 'Picher, Kansas, Austria',
    },
    {
			id: 7,
			firstName: 'Elvira',
			lastName: 'Askew',
			userName: 'elvira.askew',
			latitude: 31.1039455,
			longitude: -97.4569703,
			picture: 'https://randomuser.me/api/portraits/women/11.jpg',
			about: 'This is a sample about.',
      location: '1904  Beeghley Street, Temple, Texas, USA',
      nonprofits: [
        {
					nonprofitId: 7,
					locationId: 1,
				},
      ],
    },
    {
			id: 8,
			firstName: 'Adalbert',
			lastName: 'Adalbert Y Gracia',
			userName: 'elvira.askew',
			latitude: 39.4514466,
			longitude: -0.4947195,
			picture: 'https://randomuser.me/api/portraits/men/76.jpg',
			about: 'This is a sample about.',
      location: 'Escuadro 15, Valencia, Alaquàs, Spain',
      nonprofits: [
        {
					nonprofitId: 9,
					locationId: 1,
				},
      ],
    },
    {
			id: 9,
			firstName: 'Alana',
			lastName: 'Monds',
			userName: 'alana.monds@example.com',
			latitude: 14.6115571,
			longitude: 121.0523945,
			picture: 'https://randomuser.me/api/portraits/women/12.jpg',
			about: 'This is a sample about.',
      location: '537 Edsa Cubao, Quezon City, Manila, Philippines',
      nonprofits: [
        {
					nonprofitId: 3,
					locationId: 2,
				},
      ],
    },
    {
			id: 10,
			firstName: 'Susie',
			lastName: 'Wick',
			userName: 'susie.wick@example.com',
			latitude: 51.0130333,
			longitude: -114.2142368,
			picture: 'https://randomuser.me/api/portraits/women/16.jpg',
			about: 'This is a sample about.',
      location: '414th Ave, Calgary, Alberta, Canada',
      nonprofits: [
        {
					nonprofitId: 1,
					locationId: 1,
				},
      ],
    },
    {
			id: 11,
			firstName: 'Morgan',
			lastName: 'Noël',
			userName: 'morgan.noel@example.com',
			latitude: 51.0480273,
			longitude: -2.3740353,
			picture: 'https://randomuser.me/api/portraits/men/32.jpg',
			about: 'This is a sample about.',
      location: '105 rue Cazade, DUNKERQUE, Nord-Pas-de-Calais, France',
      nonprofits: [
        {
					nonprofitId: 2,
					locationId: 3,
				},
      ],
    },
    {
			id: 12,
			firstName: 'Dexter',
			lastName: 'Morgan',
			userName: 'dexter.morgan@example.com',
			latitude: 28.5358384,
			longitude: -81.3245852,
			picture: 'https://randomuser.me/api/portraits/men/16.jpg',
			about: 'This is a sample about.',
      location: '2306 Rosemont Avenue, Orlando, Florida, USA',
      nonprofits: [
        {
					nonprofitId: 3,
					locationId: 1,
				},
      ],
    },
    {
			id: 13,
			firstName: 'Luis',
			lastName: 'Scaggs',
			userName: 'luis.scaggs@example.com',
			latitude: -18.3410067,
			longitude: 129.0070231,
			picture: 'https://randomuser.me/api/portraits/men/20.jpg',
			about: 'This is a sample about.',
      location: '1154th Street, Yellowknife, Northwest Territories, Australia',
      nonprofits: [
        {
					nonprofitId: 8,
					locationId: 1,
				},
      ],
    },
    {
			id: 14,
			firstName: 'Doris',
			lastName: 'Lucero',
			userName: 'doris.lucero@example.com',
			latitude: 36.1865589,
			longitude: -86.9253285,
			picture: 'https://randomuser.me/api/portraits/men/29.jpg',
			about: 'This is a sample about.',
      location: '3440 Frum Street, Nashville, Tennessee, USA',
      nonprofits: [
        {
					nonprofitId: 6,
					locationId: 1,
				},
      ],
    },
    {
			id: 15,
			firstName: 'Kathleen',
			lastName: 'Embree',
			userName: 'kathleen.embree@example.com',
			latitude: 43.7917181,
			longitude: -70.1908688,
			picture: 'https://randomuser.me/api/portraits/women/22.jpg',
			about: 'This is a sample about.',
      location: '2824 Upton Avenue, Yarmouth, Maine, USA',
      nonprofits: [
        {
					nonprofitId: 7,
					locationId: 1,
				},
      ],
    },
    {
			id: 16,
			firstName: 'Charles',
			lastName: 'Fernandez',
			userName: 'charles.fernandez@example.com',
			latitude: 42.5739097,
			longitude: -121.8781663,
			picture: 'https://randomuser.me/api/portraits/men/21.jpg',
			about: 'This is a sample about.',
      location: '2685 Skinner Hollow Road, Chiloquin, Oregon, USA',
      nonprofits: [
        {
					nonprofitId: 10,
					locationId: 1,
        },
        {
					nonprofitId: 1,
					locationId: 1,
				},
      ],
    },
    {
			id: 17,
			firstName: 'Gabriella',
			lastName: 'Antonsen',
			userName: 'gabriella.antonsen@example.com',
			latitude: 63.4187191,
			longitude: 10.3687233,
			picture: 'https://randomuser.me/api/portraits/women/27.jpg',
			about: 'This is a sample about.',
      location: 'Trondheim, Norway',
      nonprofits: [
        {
					nonprofitId: 12,
					locationId: 2,
        },
      ],
    },
    {
			id: 18,
			firstName: 'Neeheeoee',
			lastName: 'Cheyenne',
			userName: 'cheyenne@example.com',
			latitude: -3.9371729,
			longitude:-75.1610383,
			picture: 'https://randomuser.me/api/portraits/women/28.jpg',
			about: 'This is a sample about.',
      location: 'Avenida Víctor Andrés Belaúnde., 147, San Isidro, Lima, Peru',
      nonprofits: [
        {
					nonprofitId: 12,
					locationId: 2,
        },
      ],
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

