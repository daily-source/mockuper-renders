import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import nonprofits from './modules/nonprofits'
import video from './modules/video'
import info from './modules/info'
import navbar from './modules/navbar'
import map from './modules/map'
import splash from './modules/splash'
import nonprofitRegistration from './modules/nonprofitRegistration'
import stations from './modules/stations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    organization: {
      name: 'Georgetown University',
      picture: require('@/assets/img/georgetown-university-2.jpg'),
      // description: 'Everyone in the U.S. today is benefitting from current slavery. Slaves grow and pick some of the food we consume, produce some of our clothing, mine the raw materials used in our products, and make some of the products we all use. In its earliest years, Georgetown benefitted from slavery and might not exist today if not for slaves. Later, the sacrifices of those who fought slavery benefitted the school: a former slave became Georgetown’s “second founder” and developed the university into what it is today. With the sacrifices of those people in mind, Georgetown alumni, students, staff and fans are joining together to help the people who are involuntarily sacrificing and suffering the most now: modern-day slaves. Please join in our efforts by clicking <a href="#">here</a>.',
      description: `
        <p>Everyone in the U.S. today is benefitting from current slavery. Slaves around the world grow and pick some of the food we consume, mine raw materials and make some of the clothing, electronics and other products we all use. In its early years, Georgetown benefitted from slavery, and might not exist now if not for slaves. Later, it benefitted from the sacrifices of people who freed slaves: a former slave, Patrick Healy, became Georgetown’s “second founder” and transformed it from a small rural college to a major national university. With all that in mind, Georgetown alumni, students, staff and fans are joining together to help the people who are involuntarily sacrificing and suffering the most now: modern-day slaves. Please join in <a href="#">here</a>.</p>
      `,
    },
  },
	modules: {
		users,
		nonprofits,
		video,
		info,
		navbar,
		map,
    splash,
    nonprofitRegistration,
    stations,
	},
})
