<template>
	<div class="virtual-railroad-map">
		<section class="section">
			<div class="container">
				<GmapMap
					class='map'
					:center='{lat: 0, lng: 0}'
					:zoom='2'
					@click='handleMapClicked'
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
						:path='generateNonprofitLinePath(nonprofit)'
						@polylineCreated='onPolylineCreate'
						:options='polylineOptions'			
					/>	
					<UserPopupWindow 
						v-if='selectedUser'
						:user='selectedUser'
						@seeTracksClicked='seeTracks'
					/>
				</GmapMap>
			</div>
		</section>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { curvedLineGenerate } from './curvedpolyline/CurvedPolyline'
import PolylineAnimatedSymbol from './curvedpolyline/CurvedPolylineComponent'
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

		generateNonprofitLinePath(nonprofit) {
			const path = curvedLineGenerate({
			 	latStart: this.selectedUser.latitude, 
				lngStart: this.selectedUser.longitude,
				latEnd: nonprofit.latitude, 
				lngEnd: nonprofit.longitude
			})
			return path		
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
		}
	},
}
</script>

<style scoped lang='scss'>
.map {
	height: 500px;
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
