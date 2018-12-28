import User from './model'
import {internet, name, address, image} from 'faker'

const createUsers = (length = 5) => {
	return [...Array(length)].map((_, i) => {
		const user = new User(i+1, internet.userName(), name.firstName(), name.lastName(), address.latitude(), address.longitude(), image.avatar())
		user.nonprofits = [1, 2, 3, 4, 5]
		return user
	})
}

const state = {
	data: [	
		new User(100, 'testuser', 'test', 'user', 33.2788, 98.5977, 'https://s3.amazonaws.com/uifaces/faces/twitter/matbeedotcom/128.jpg').nonprofits = [1, 2],
		new User(101, 'testuser1', 'Constantin', 'Friesen', 8.1037, 2.7017, 'https://s3.amazonaws.com/uifaces/faces/twitter/matbeedotcom/128.jpg').nonprofits = [3, 4],
		new User(102, 'testuser2', 'Tod', 'Becker', 85.6875, -20.8699, 'https://s3.amazonaws.com/uifaces/faces/twitter/soyjavi/128.jpg').nonprofits = [5, 6],
		new User(103, 'testuser3', 'Stella', 'Strosin', 60.0201, -20.1797, 'https://s3.amazonaws.com/uifaces/faces/twitter/jnmnrd/128.jpg').nonprofits = [7, 8],
	  ...createUsers(),	
	],
}

const mutations = {}

const getters = {
	getUserNonprofits: (state, getter, {nonprofits}) => (id = 1) => {
		const user = state.data.find((user, index) => user.id === id)

		const userNonprofits = nonprofits.data.filter(nonprofit => user.nonprofits.includes(nonprofit.id))

		return userNonprofits
	}
}

const actions = {}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

