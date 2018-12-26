import Nonprofit from './model'
import Faker from 'faker'

const generateNonprofits = (length = 5) => {
	return [...Array(length)].map((_, i) => {
		return new Nonprofit(
			i + 1,
			Faker.company.companyName(),
			Faker.lorem.sentence(),
			Faker.address.state(),
			Faker.address.country(),
			Faker.image.business(),
			Faker.internet.url(),
			Faker.address.streetAddress(true),
			Faker.address.latitude(),
			Faker.address.longitude(),
		)
	})

}

const state = {
	data: [	
		...generateNonprofits(),
	],
}

const getters = {}

const mutations = {}

const actions = {}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
}
