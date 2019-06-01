<template>
	<div class="virtual-railroad-map-wrapper">
		<div 
			class='virtual-railroad-map-loader'
			v-show='showLoader'
		>
			<loader 
				message='Fitting everything to the map.'
				color='#fff'
				:width='48'
				:height='48'
			/>
		</div>
		<google-map
			ref='gmap'
			class='virtual-railroad-map'
			@mapClicked='onMapClicked'
			@mapReady='onMapReady'
			:zoom='zoom'
      :center='center'
		>
      <gmap-marker
        v-if='nonprofitMarker'
        :position='nonprofitMarker.position'
        :icon='nonprofitMarker.icon'
        @click='toggleNonprofitOrgPopup'
      />
			<gmap-marker 
				v-for='(user, index) in validUserMarkers'
				:key='index'
				:position='generatePosition(user.latitude, user.longitude)'
				:icon='require(`@/assets/img/light_bulb_${iconSize}.png`)'
				@click='addSelectedUser(user)'
			/>
			<gmap-marker
				v-for='(location, index) in locationMarkers'
				:key='`nonprofit-${index}`'
				:position='generatePosition(location.latitude, location.longitude)'
				:icon='google && generateMarkerIcon(
					generatePosition(location.latitude, location.longitude),
					"nonprofit"
				)'
				@click='setSelectedNonprofit(location)'

			/>
			<gmap-marker
				v-for='(marker, index) in validMarkers'
				:key='`custom-marker-${index}`'
				:position='marker.position'
				:icon='marker.icon'
			/>
			<polyline-animated-symbol
				v-for='nonprofit in userNonprofitAnimatedPolylines'
				:key='`polyline-${nonprofit.user.id}-${nonprofit.id}-${nonprofit.location.id}`'
				:path='setUserNonprofitPath(nonprofit.location, nonprofit.user)'
				@polylineCreated='(polyline) => onPolylineCreate(polyline, nonprofit.user)'
				:options='polylineOptions'
			/>
			<user-popup-window
				v-for='user in selectedUsers'
				:key='`user-${user.id}`'
				:user='user'
				@closeButtonClicked='removeUser'
				@previousViewClicked='removeUser'
				@seeTracksClicked='onSeeTracksClicked'
			/>
			<nonprofit-popup-window 
				v-if='selectedNonprofit'
				:nonprofit='selectedNonprofit'
				@nonprofitCloseButtonClicked='setSelectedNonprofit(null)'
			/>
      <organization-popup-window
        v-if='showNonprofitOrg'
        :organization='{
          name: nonprofitMarker.name,
          latitude: nonprofitMarker.position.lat,
          longitude: nonprofitMarker.position.lng,
          mainImage: nonprofitMarker.mainImage,
        }'
        @closeButtonClicked='toggleNonprofitOrgPopup'
      />
		</google-map>
	</div>
</template>

<script>
import { curvedLineGenerate } from 'LocalComponents/CurvedPolyline'
import GoogleMap from 'LocalComponents/GoogleMap'
import PolylineAnimatedSymbol from 'LocalComponents/PolylineAnimatedSymbol'
import UserPopupWindow from 'LocalComponents/UserPopupWindow/UserPopupWindow.vue'
import NonprofitPopupWindow from 'LocalComponents/NonprofitPopupWindow/NonprofitPopupWindow.vue'
import OrganizationPopupWindow from 'LocalComponents/OrganizationPopupWindow/OrganizationPopupWindow.vue'
import Loader from 'Components/Shared/Loader'

export default {
	name: 'VirtualRailroadMap',

	components: {
		GoogleMap,
		UserPopupWindow,
		NonprofitPopupWindow,
    PolylineAnimatedSymbol,
    OrganizationPopupWindow,
		Loader,
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

		/**
		 * Size of the icons.
		 */
		iconSize: {
			type: Number,
			required: false,
			default: 16,
			validator: (value) => {
				const sizes = [16, 26, 29, 31, 32,  64, 128, 256]

				return sizes.indexOf(value) !== -1
			}
		},

		/**
		 * The map zoom value.
		 */
		zoom: {
			type: Number,
			required: false,
			default: 2,
    },
    
    /**
     * The map's center
     */
    center: {
      type: Object,
      required: false,
    },

    /**
     * Nonprofit Marker
     */
    nonprofitMarker: {
      type: Object,
      required: false,
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
			selectedNonprofit: null,
			polylines: [],
			google: null,
			map: null,
      showLoader: null,
      showNonprofitOrg: false,
			selectedUsers: [],
		}
	},

	methods: {
		/** 
		 * Handle on Google Map clicked events
		 */
		onMapClicked (position) {
			console.log(position)
			// this.setSelectedUsers = []
			// this.setSelectedNonprofit(null)
		},

		/**
		 * Triggers when map is ready
		 */
		onMapReady (gmap, google) {
			this.google = google
      this.map = gmap
      
			this.$emit('mapReady', gmap, google, this)
		},

		/**
		 * Adds a user to selectedUsers array.
		 * 
		 * @param {Object} user
		 */
		addSelectedUser (user) {
			let isAlreadyAdded = false

			if (this.selectedUsers.length > 0) {
				isAlreadyAdded = this.selectedUsers.find(userRecord => userRecord.id === user.id)
			}

			if (!isAlreadyAdded) {
				this.selectedUsers.push(user)
			}
		},

		/**
		 * Removes a user from the `selectedUser` array if it exists.
		 */
		removeUser (user) {
			const selectedUsers = this.selectedUsers.filter(userRecord => userRecord.id !== user.id)

			this.selectedUsers = selectedUsers
		},

		/**
		 * Sets the selected nonprofit.
		 * 
		 * @param {Object} nonprofit
		 */
		setSelectedNonprofit (nonprofit) {
      this.selectedNonprofit = null

			if (nonprofit) {
        console.log(this.selectedNonprofit)
        const locationNonprofit = this.nonprofits.find(np => np.id === nonprofit.nonprofitId)
        console.log(locationNonprofit)
				const selectedNonprofit = {
					...nonprofit,
					...locationNonprofit,
				}
        this.selectedNonprofit = selectedNonprofit
        
			} else {
				this.selectedNonprofit = null
      }
      
      this.google.maps.event.trigger(this.map, 'resize')
		},

		/** 
		 * Generates a User to Nonprofit polyline path.
		 *
		 * @param {Object} nonprofit
		 * 
		 * @return {Array} Array of points
		 */
		setUserNonprofitPath (nonprofit, user) {
			return curvedLineGenerate({
				latStart: user.latitude, 
				lngStart: user.longitude,
				latEnd: nonprofit.latitude, 
				lngEnd: nonprofit.longitude
			})	
		},

		/** 
		 * Handle 'See Tracks' clicked event
		 */
		onSeeTracksClicked (user) {
			this.animatePolylines(user)
    },

    /**
     * Toggles the NonprofitOrgPopUp
     */
    toggleNonprofitOrgPopup () {
      this.showNonprofitOrg = !this.showNonprofitOrg
    },

		/** 
		 * Animate the polylines
		 */
		animatePolylines (user) {
			if (this.polylines) {
				this.polylines.forEach(({polyline, userId}) => {
					console.log(polyline)
					if (userId === user.id) {
						polyline.animateCircle()
					}
				})
			}
		},

		/** 
		 * Triggers when a polyline is created
		 */
		onPolylineCreate (polyline, user) {
			this.polylines.push({
				polyline,
				userId: user.id,
			})
		},

		/** 
		 * Generate a position object.
		 *
		 * @param {(string|number)} lat Latitude
		 * @param {(string|number)} lng Longitude
		 *
		 * @return {Object} Returns a promise object
		 */
		generatePosition (lat, lng) {
			return {
				lat: parseFloat(lat || 0),
				lng: parseFloat(lng || 0),
			}
		},

		/** 
		 * Generate an icon from a marker object
		 *
		 * @param {Object} marker
		 * 
     * @return {string}
		 */
		generateMarkerIcon (position, type='nonprofit') {
			let iconName

			if (type == 'nonprofit') {
				iconName = 'star'	
			}

			if (type =='user') {
				iconName = 'light_bulb'
			}

			const pointOffset = this.iconSize / 2

			return {
				url: require(`@/assets/img/${iconName}_${this.iconSize}.png`),
				anchor: new this.google.maps.Point(pointOffset, pointOffset),
			}
		},

		fitMarkerToMap (markerPosition, map) {
			return new Promise((resolve, reject) => {
				let contained = false

				while (!contained) {
					if (!map.getBounds().contains(markerPosition)) {
						const zoom = map.getZoom()
						map.setZoom(zoom - 1)
					} else {
						contained = true
					}
				}

				resolve()
			})
		},
	},

	computed: {
		/**
		 * Filter out the `users` prop to make sure to display markes only
		 * with a position prop.
		 */
		validUserMarkers () {
			return this.users.filter(user => user.latitude && user.longitude)
		},
		
		/**
		 * Filter out the locations from the `nonprofits` prop 
		 * to make sure to display markes only with a valid location.
		 */
		validNonprofitLocationMarkers () {
			return this.nonprofits.map(nonprofit => {
				const locations = nonprofit.locations.filter(location => {
					return location.latitude && location.longitude
				})
				return {
					...nonprofit,
					locations,
				}
			})
		},


		/**
		 * Locations to display on the map
		 */
		locationMarkers () {
			let locations = []
			this.validNonprofitLocationMarkers.forEach(nonprofit => {
				const mappedLocations = nonprofit.locations.map(location => {
					return {
						...location,
						nonprofitId: nonprofit.id,
					}
				})
				locations = [
					...locations,
					...mappedLocations
				]
			})

			return locations
		},

		/**
		 * Filter out markers from the `markers` prop making sure that we display
		 * markers that has a valid position property/
		 */
		validMarkers () {
			return this.markers.filter(marker => marker.position)
		},
		/**
		 * User nonprofit animated polylines
		 */
		userNonprofitAnimatedPolylines () {
			let userNonprofitAnimatedPolylines = []

			this.selectedUsers.forEach( user => {
        if (user.nonprofits) {
          const userNonprofits = user.nonprofits.map(nonprofitPair => {
            const nonprofit = this.nonprofits.find(nonprofit => nonprofit.id == nonprofitPair.nonprofitId)
            const location = nonprofit.locations.find(location => location.id == nonprofitPair.locationId)
  
            return {
              ...nonprofit,
              location,
              user,
            }
          })
  
          userNonprofitAnimatedPolylines = [
            ...userNonprofitAnimatedPolylines,
            ...userNonprofits,
          ]
        }
			})

			return userNonprofitAnimatedPolylines
		},


		/**
		 * Marker Default Options 
		 */
		markerDefaultOptions () {
			if (google) {
				const anchorPoint = this.iconSize / 2
				return {
					anchor: new google.maps.Point(anchorPoint, anchorPoint)
				}
			}
		},
	},

	watch: {
		/**
		 * Fits the bounds of the map according to the selectedUserNonprofits
		 */
		selectedUserNonprofits (nonprofits) {
			if (nonprofits && nonprofits.length > 0) {
				const bounds = new this.google.maps.LatLngBounds()

				const userPosition = new this.google.maps.LatLng({
					lat: this.selectedUser.latitude,
					lng: this.selectedUser.longitude,
				})

				bounds.extend(userPosition)

				this.map.fitBounds(bounds)

				this.showLoader = true

				nonprofits.forEach( async nonprofit => {
					const position = new this.google.maps.LatLng({
						lat: nonprofit.location.latitude, 
						lng: nonprofit.location.longitude
					})

					await this.fitMarkerToMap(position, this.map)
				})

				// The loader is not necessary for user with just small nonprofits, it
				// doesn't show on this case. The loader just shows when a user has many
				// nonprofits. Nevertheless, we add a timeout here so the loader shows
				// no matter how many nonprofits there is. Besides, 300ms is not that
				// long to hinder any user activity for now.
				setTimeout( () => {
					this.showLoader = false
				}, 300)
			}
		}
	},
}
</script>

<style lang='scss'scoped>
.virtual-railroad-map {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	max-width: 100%;
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

.virtual-railroad-map-loader {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
	display: flex;
	align-items: cetner;
	justify-content: center;
	color: #fff;
	background-color: rgba(#000, .5)
}
</style>
