<template>
	<div class='home-map'>
		<div class='virtual-railroad-map-container'>
			<virtual-railroad-map 
				:users='users'	 
				:nonprofits='nonprofits'
				:markers='markers'
			/>	
		</div>
		<div 
			class='call-to-action'
		  v-if='showCallToAction'
		>
			<p class='has-text-centered'>Join <router-link to="register">now</router-link> to help free slaves, and turn your red marker into a lamp of freedom!</p>	
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import userGeolocation from '@/util/userGeolocation'

import VirtualRailroadMap from 'LocalComponents/VirtualRailroadMap'

export default {
	name: 'HomeMap',

	mixins: [userGeolocation],

	data () {
		return {
			callToActionTimer: 180000,
			showCallToAction: false,
		}
	},

	mounted () {
		this.startCallToActionTimer()
	},
	
	components: {
		VirtualRailroadMap,
	},

	methods: {
		/** 
		 * Start the timer to show the call to action
		 */
		startCallToActionTimer () {
			setTimeout(() => {
				this.showCallToAction = true
				this.getUserLocation() 
			}, this.callToActionTimer)
		},


	},

	computed: {
		/** 
		 * Custom markers to display on the map
		 */
		markers () {
			let markers = []
			if (this.userLocation) {
				const userMarker = {
					position: {
						lat: this.userLocation.coordinates.latitude,
						lng: this.userLocation.coordinates.longitude,
					}
				}

				markers.push(userMarker)
			}

			return markers
		},

		...mapState({
			users: state => state.users.data,
			nonprofits: state => state.nonprofits.data,
		}),
	},
}
</script>

<style lang='scss' scoped>
.virtual-railroad-map-container {
	margin-bottom: 1.125em;	
}
</style>
