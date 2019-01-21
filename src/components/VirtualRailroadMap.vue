<template>
	<div class="virtual-railroad-map">
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
					:icon='require("@/assets/img/light_bulb_16.png")'ue
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
					@closeButtonClicked='setSelectedUser(null)'
				/>
			</GmapMap>
		</div>
		<div 
			class='call-to-action'
			v-if='showCallToAction'
		>
			<p class='has-text-centered is-marginless'>Join <a href="#">now</a> to help free slaves, and turn your red marker into a lamp of freedom!</p>	
		</div>
	</div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
import { mapState, mapGetters } from 'vuex'

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
			callOutInterval: 180000,
			showCallToAction: false,
		}
	},

	mounted () {
		this.$refs.gmap.$mapPromise.then((map) => {
			map.mapTypes.set(this.mapTypeId, this.customMapType)
		})

		setTimeout(() => {
			this.getCurrentUserPosition()
			this.showCallToAction = true
			console.log('something')
		}, this.callOutInterval)
	},

	methods: {
		setUserLocation (lat = 0, lng = 0) {
			this.userPosition = {
				lat,
				lng,
			}
		},

		getCurrentUserPosition () {
			navigator.geolocation.getCurrentPosition(
				({coords}) => {
					this.setUserLocation(coords.latitude, coords.longitude)
				}
			)
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

		onPolylineCreate (polyline) {
			this.polylines.push(polyline)
		},
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

.virtual-railroad-map-section {
	padding-top: 1rem;
	padding-bottom: 1rem;

	.virtual-railroad-map__intro {
		font-size: 16px;
		margin-left: auto;
		margin-right: auto;
	}
}

.legends {
	padding-top: 1.25em;
	padding-bottom: 1.25em;

	p:not(:last-of-type) {
		margin-bottom: 1.25em;
	}

	img {
		vertical-align: middle;
	}
}

.call-to-action {
	padding-top: 1.25em;
	padding-bottom: 0;
}
</style>
