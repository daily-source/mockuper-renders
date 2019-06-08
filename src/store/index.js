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
      picture: require('@/assets/img/georgetown-university-1.jpg'),
      description: `<p>The Hoya Railroad is an effort of the extended Georgetown community to help free today’s slaves. Everyone in the U.S. today is benefitting from current slavery. Slaves grow and pick some of the food we consume, produce some of our clothing, mine the raw materials used in our products, and make some of the products we use. In its early years, Georgetown benefitted from slavery and might not exist if not for slaves. Later, the sacrifices of those who fought slavery benefitted the school, as a former slave became Georgetown’s “second founder” and developed the university into what it is today.</p>

      <p>With their sacrifices in mind, Georgetown alumni, students, staff and fans are joining together to help the people who are involuntarily sacrificing and suffering the most now: modern-day slaves. Georgetown’s founders owned and sold 272 slaves that helped fund the early years of the school. Our goal is to free ten times that many slaves in the coming decade: 2,720 slaves freed by the greater Georgetown community. We welcome you to join in our efforts. <a href="#">Start now</a></p>`
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
