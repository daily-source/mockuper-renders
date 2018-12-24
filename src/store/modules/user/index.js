import User from './model'
import Faker from 'faker'

const createUsers = () => {
	return [...Array(5)].map(() => {
		return new User(Faker.internet.userName(), Faker.name.firstName(), Faker.name.lastName(), Faker.address.latitude(), Faker.address.longitude(), Faker.image.avatar())
	})
}

const state = {
	data: [
		...createUsers()
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

