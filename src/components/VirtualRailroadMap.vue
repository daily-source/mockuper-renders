<template>
	<div class="virtual-railroad-map">
		<div class="container">
			<GmapMap
				class='map'
				:center='{lat: 32.33888927939217, lng: 6.1015625}'
				:zoom='2'
				:mapTypeId='mapTypeId'
				@click='onMapClicked'
				:options='google && mapOptions'
				ref='gmap'
			>
				<GmapMarker 
					v-for='(user, index) in validUserMarkers'
					:key='index'
					:position='generatePosition(user.latitude, user.longitude)'
					:icon='require("@/assets/img/light_bulb_16.png")'
					@click='setSelectedUser(user)'
				/>
				<GmapMarker
					v-for='(nonprofit, index) in validNonprofitMarkers'
					:key='`nonprofit-${index}`'
					:position='generatePosition(nonprofit.latitude, nonprofit.longitude)'
					:icon='require("@/assets/img/star_16.png")'
				/>
				<GmapMarker
					v-for='(marker, index) in validMarkers'
					:key='`custom-marker-${index}`'
					:position='marker.position'
					:icon='marker.icon'
				/>
				<PolylineAnimatedSymbol
					v-for='(nonprofit, index) in selectedUserNonprofits'
					:key='`userNonprofit-${index}`'
					:path='setUserNonprofitPath(nonprofit)'
					@polylineCreated='onPolylineCreate'
					:options='polylineOptions'			
				/>	
				<UserPopupWindow 
					v-if='showUserPopupWindows && selectedUser'
					:user='selectedUser'
					@seeTracksClicked='onSeeTracksClicked'
					@previousViewClicked='setSelectedUser(null)'
					@closeButtonClicked='setSelectedUser(null)'
				/>
			</GmapMap>
		</div>
	</div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'

import mapStyles from '@/mapStyles'
import { curvedLineGenerate } from 'LocalComponents/CurvedPolyline'
import PolylineAnimatedSymbol from 'LocalComponents/PolylineAnimatedSymbol'
import UserPopupWindow from 'LocalComponents/UserPopupWindow/UserPopupWindow.vue'

export default {
	name: 'VirtualRailroadMap',

	components: {
		UserPopupWindow,
		PolylineAnimatedSymbol,
	},

	props: {
		/** 
		 * The user markers to display on the map.
		 */
		users: {
			type: Array,
			required: false,
			default: () => {
				return []
			}
		},
		
		/** 
		 * The nonprofit markers to display on the map.
		 */
		nonprofits: {
			type: Array,
			required: false,
			default: () => {
				return [] 
			},
		},
		
		/** 
		 * User-defined markers to display on the map.
		 */
		markers: {
			type: Array,
			required: false,
			default: () => {
				return []
			}
		},

		/** 
		 * Show user pop windows.
		 */
		showUserPopupWindows: {
			type: Boolean,
			required: false,
			default: true,
		},
	},

	data () {
		return {
			polylineOptions: {
				geodesic: false,
				strokeColor: '#4475b7',
				strokeOpacity: 1.0,
				strokeWeight: 2,
			},
			mapTypeId: 'virtual-railroad',
			selectedUser: null,
			polylines: [],
		}
	},

	mounted () {
		this.$refs.gmap.$mapPromise.then((map) => {
			map.mapTypes.set(this.mapTypeId, this.customMapType)
			this.$emit('mapReady', map)
		})
	},

	methods: {
		/** 
		 * Handle on Google Map clicked events
		 */
		onMapClicked () {
			this.setSelectedUser(null)
		},

    /** 
		 * Sets the selected user.
		 *
		 * @param {Object} user
		 */
		setSelectedUser (user) {
			this.selectedUser = user
		},

		/** 
		 * Generates a User to Nonprofit polyline path.
		 *
		 * @param {Object} nonprofit
		 * 
		 * @returns {Array} Array of points
		 */
		setUserNonprofitPath(nonprofit) {
			return curvedLineGenerate({
				latStart: this.selectedUser.latitude, 
				lngStart: this.selectedUser.longitude,
				latEnd: nonprofit.latitude, 
				lngEnd: nonprofit.longitude
			})		
		},

		/** 
		 * Handle 'See Tracks' clicked event
		 */
		onSeeTracksClicked () {
			this.polylines.forEach(polyline => {
				polyline.animateCircle()
			})
		},

		onPolylineCreate (polyline) {
			this.polylines.push(polyline)
		},

		/** 
		 * Generate a position object.
		 *
		 * @param {(string|number)} lat Latitude
		 * @param {(string|number)} lng Longitude
		 *
		 * @returns {Object} Returns a promise object
		 */
		generatePosition (lat, lng) {
			return {
				lat: parseFloat(lat),
				lng: parseFloat(lng),
			}
		},

		/** 
		 * Generate an icon from a marker object
		 *
		 * @param {Object} marker
		 *
     * @returns {string}
		 */
		generateMarkerIcon (marker) {
			if (!marker.icon) {
				return false
			}

			return marker.icon
		},
	},

	computed: {
		/**
		 * The Google map API instance.
		 *
		 * We need this in order to access the google object on our code.
		 */
		google: gmapApi,

		/**
		 * Filter out the `users` prop to make sure to display markes only
		 * with a position prop.
		 */
		validUserMarkers () {
			return this.users.filter(user => user.latitude && user.longitude)
		},

		/**
		 * Filter out the `nonprofits` prop to make sure to display markes only
		 * with a position prop.
		 */
		validNonprofitMarkers () {
			return this.nonprofits.filter(nonprofit => nonprofit.latitude && nonprofit.longitude)
		},

		/**
		 * Filter out markers from the `markers` prop making sure that we display
		 * markers that has a valid position property/
		 */
		validMarkers () {
			return this.markers.filter(marker => marker.position)
		},

		/** 
	   * The Custom Map Type
		 */
		customMapType() {
			return new this.google.maps.StyledMapType(mapStyles, {name: 'DARK'})
		},

		/** 
		 * Custom Map Control options
		 */
		mapTypeControlOptions() {
			return {
				mapTypeIds: [
					this.google.maps.MapTypeId.ROADMAP,
					this.google.maps.MapTypeId.HYBRID,
					this.mapTypeId,
				]
			}
		},
		
		/** 
		 * Google Map options.
	   *
		 * TODO: Make options as a prop and then compute the mapoptions using default.
		 */
		mapOptions () {
			return {
				mapTypeControlOptions: this.mapTypeControlOptions,
				panControl: false,
				streetViewControl: false,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.SMALL,
				}
			}
		},

		/** 
		 * Nonprofits of the selected user.
		 */
		selectedUserNonprofits () {
			if (this.selectedUser) { 
				return this.selectedUser.nonprofits.map(userNonprofit => {
					return this.nonprofits.find(nonprofit => nonprofit.id === userNonprofit)
				})	
			}

			return []
		},
	},
}
</script>

<style lang='scss'scoped>
.map {
	height: 500px;
	max-width: 995px;
	margin-left: auto;
	margin-right: auto;
	width: 100%;
}

.user-info-window {
	text-align: center;
	font-size: .75rem;
}

.user-info-window__username {
	font-weight: 600;
	font-family: $font-primary;
	font-size: .75rem;
	color: #000;
	margin-bottom: .5rem;
}

.user-info-window__avatar-img {
	width: 80px;
	height: 80px;
	object-fit: cover;
}
</style>
