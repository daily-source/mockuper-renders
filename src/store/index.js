import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import nonprofits from './modules/nonprofits'
import video from './modules/video'
import info from './modules/info'
import navbar from './modules/navbar'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		users,
		nonprofits,
		video,
		info,
		navbar,
	},
})
