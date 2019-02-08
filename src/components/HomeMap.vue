<template>
	<div class='home-map'>
		<div class='virtual-railroad-map-container'>
			<virtual-railroad-map 
				:users='users'	 
				:nonprofits='nonprofits'
				:markers='markers'
				@mapReady='onMapReady'
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
			google: null,
			map: null,
		}
	},

	mounted () {
		this.startCallToActionTimer()

		window.addEventListener('resize', this.setZoom)
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

		/**
		 * Triggers when the virtual railroad map is ready.
		 */
		onMapReady (map, google) {
			this.google = google
			this.map = map

			this.setZoom()
		},

		setZoom () {
			const width = window.innerWidth

			const zoom = Math.log2(width) - 7.7
		
			this.map.setZoom(zoom)
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
.home-map {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
