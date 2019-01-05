<template>
	<div class="virtual-railroad-map">
		<section class="section">
			<div class="container">
				<GmapMap
					class='map'
					:center='{lat: 32.33888927939217, lng: 6.1015625}'
					:zoom='2'
					:mapTypeId='mapTypeId'
					@click='handleMapClicked'
					:options='google && mapOptions'
					ref='gmap'
				>
					<GmapMarker
						v-if='userPosition'
						:position='userPosition'
					/>
					<GmapMarker
						v-for='(user, index) in users'
						:key='index'
						:position='{lat: parseFloat(user.latitude), lng: parseFloat(user.longitude)}'
						:icon='require("@/assets/img/light_bulb_16.png")'
						@click='setSelectedUser(user)'
					/>
					<GmapMarker
						v-for='(nonprofit, index) in nonprofits'
						:key='`nonprofit-${index}`'
						:position='{lat: parseFloat(nonprofit.latitude), lng: parseFloat(nonprofit.longitude)}'
						:icon='require("@/assets/img/star_16.png")'
					/>
					<PolylineAnimatedSymbol
						v-for='(nonprofit, index) in selectedUserNonprofits'
						:key='`userNonprofit-${index}`'
						:path='setUserNonprofitPath(nonprofit)'
						@polylineCreated='onPolylineCreate'
						:options='polylineOptions'			
					/>	
					<UserPopupWindow 
						v-if='selectedUser'
						:user='selectedUser'
						@seeTracksClicked='seeTracks'
						@previousViewClicked='setSelectedUser(null)'
					/>
				</GmapMap>
			</div>
		</section>
	</div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
import { mapState, mapGetters } from 'vuex'

import mapStyles from '../mapStyles'
import { curvedLineGenerate } from './CurvedPolyline'
import PolylineAnimatedSymbol from './PolylineAnimatedSymbol'
import UserPopupWindow from './userpopupwindow/UserPopupWindow.vue'

export default {
	name: 'VirtualRailroadMap',

	components: {
		UserPopupWindow,
		PolylineAnimatedSymbol,
	},

	data () {
		return {
			userPosition: null,
			polylineOptions: {
				geodesic: false,
				strokeColor: '#4475b7',
				strokeOpacity: 1.0,
				strokeWeight: 2,
			},
			mapTypeId: 'virtual-railroad',
			selectedUser: null,
			selectedUserNonprofits: null,
			polylines: [],
		}
	},

	mounted () {
		navigator.geolocation.getCurrentPosition(
			({coords}) => {
				this.setUserLocation(coords.latitude, coords.longitude)
			}
		)

		this.$refs.gmap.$mapPromise.then((map) => {
			map.mapTypes.set(this.mapTypeId, this.customMapType)
		})
	},

	methods: {
		setUserLocation (lat = 0, lng = 0) {
			this.userPosition = {
				lat,
				lng,
			}
		},

		handleMapClicked () {
			console.log('clicked')
			this.setSelectedUser(null)
		},

		setSelectedUser (user) {
			this.selectedUser = user

			if (user) {
				this.selectedUserNonprofits = this.getUserNonprofits(user.id)
			} else {
				this.selectedUserNonprofits = null
				this.polylines = []
			}
		},

		setUserNonprofitPath(nonprofit) {
			return curvedLineGenerate({
				latStart: this.selectedUser.latitude, 
				lngStart: this.selectedUser.longitude,
				latEnd: nonprofit.latitude, 
				lngEnd: nonprofit.longitude
			})		
		},

		seeTracks () {
			console.log('something')
			this.polylines.forEach(polyline => {
				console.log(polyline)
				polyline.animateCircle()
			})
		},

		clearRefs () {
			console.log(this.$refs)
		},

		onPolylineCreate (polyline) {
			this.polylines.push(polyline)
		}
	},

	computed: {
		google: gmapApi,

		customMapType() {
			return new this.google.maps.StyledMapType(mapStyles, {name: 'DARK'})
		},

		mapTypeControlOptions() {
			return {
				mapTypeIds: [
					this.google.maps.MapTypeId.ROADMAP,
					this.google.maps.MapTypeId.HYBRID,
					this.mapTypeId,
				]
			}
		},

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

		...mapState({
			users: state => state.users.data,
			nonprofits: state => state.nonprofits.data,
		}),
		...mapGetters({
			getUserNonprofits: 'users/getUserNonprofits'
		})
	},

	watch: {
		userPosition () {
			console.log('changed')
		},

		google () {
			console.log('Google object changed:', this.google)
		}
	},
}
</script>

<style scoped lang='scss'>
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
