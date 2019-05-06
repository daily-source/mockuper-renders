<template>
	<div class='home-map'>
		<div class='virtual-railroad-map-container'>
			<virtual-railroad-map 
				:users='users'	 
				:nonprofits='nonprofits'
				:markers='markers'
				@mapReady='onMapReady'
				:zoom='initialZoom'
				:icon-size='26'
				ref='virtual-railroad-map'
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
import { mapState, mapGetters } from 'vuex'
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
			}, 3000)
		},

		/**
		 * Triggers when the virtual railroad map is ready.
		 */
		onMapReady (map, google) {
			this.google = google
			this.map = map

			this.featuredUsers.forEach( user => {
				this.$refs['virtual-railroad-map'].addSelectedUser(user)
			})

			this.setZoom
			window.addEventListener('resize', this.setZoom)
		},

		/**
		 * Fits the whole world into the Google Map, which depends on the size of
		 * the screen.
		 */
		setZoom () {
			const width = window.innerWidth

			const zoom = Math.ceil(Math.log2(width) - 8)
		
			if (this.map.zoom <= zoom) {
				this.map.setZoom(zoom)
			}
		},
	},

	computed: {
		/** 
		 * Custom markers to display on the map
		 */
		markers () {
      let markers = []
			if (this.userLocation) {
        console.log(this.userLocation)
        
        if (this.userLocation.coords && this.userLocation.coords.latitude &&  this.userLocation.coords.longitude) {
          const userMarker = {
            position: {
              lat: this.userLocation.coords.latitude,
              lng: this.userLocation.coords.longitude,
            }
          }
          markers.push(userMarker)
        }
			}


			return markers
		},

		/**
		 * Initial zoom of the map
		 */
		initialZoom () {
			const width = window.innerWidth

			return Math.ceil(Math.log2(width) - 8)
		},

		...mapState({
			users: state => state.users.data,
			nonprofits: state => state.nonprofits.data,
		}),

		...mapGetters({
			featuredUsers: 'users/getFeaturedUsers',
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
