import Nonprofit from './model'
import {company, lorem, address, image, internet} from 'faker'

const generateNonprofits = (length = 5) => {
	return [...Array(length)].map((_, i) => {
		return new Nonprofit(
			i + 1,
			company.companyName(),
			lorem.sentence(),
			address.state(),
			address.country(),
			image.business(),
			internet.url(),
			address.streetAddress(true),
			address.latitude(),
			address.longitude(),
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
