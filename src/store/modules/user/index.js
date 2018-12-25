import User from './model'
import Faker from 'faker'

const createUsers = (length = 5) => {
	return [...Array(length)].map(() => {
		return new User(Faker.internet.userName(), Faker.name.firstName(), Faker.name.lastName(), Faker.address.latitude(), Faker.address.longitude(), Faker.image.avatar())
	})
}

const state = {
	data: [	
		new User('testuser', 'test', 'user', 33.2788, 98.5977, 'https://s3.amazonaws.com/uifaces/faces/twitter/matbeedotcom/128.jpg'),
		new User('testuser1', 'Constantin', 'Friesen', 8.1037, 2.7017, 'https://s3.amazonaws.com/uifaces/faces/twitter/matbeedotcom/128.jpg'),
		new User('testuser2', 'Tod', 'Becker', 85.6875, -20.8699, 'https://s3.amazonaws.com/uifaces/faces/twitter/soyjavi/128.jpg'),
		new User('testuser3', 'Stella', 'Strosin', 60.0201, -20.1797, 'https://s3.amazonaws.com/uifaces/faces/twitter/jnmnrd/128.jpg'),
		new User('testuser4', 'Durward', 'Lehner', -48.1305, 82.4651, 'https://s3.amazonaws.com/uifaces/faces/twitter/longlivemyworld/128.jpg'),
	  ...createUsers(),	
	],
}

const mutations = {}

const getters = {}

const actions = {}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}

