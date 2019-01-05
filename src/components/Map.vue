<template>
	<section class="section virtual-railroad-map-section">
		<div class="container">
			<p class='has-text-centered virtual-railroad-map__intro'>Click the bulbs to see who's helping free slaves and where they're helping. Click <a href='#'>here </a> to be part of the Virtual Railroad.</p>
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
					@closeButtonClicked='setSelectedUser(null)'
				/>
			</GmapMap>
		</div>
		<div class='legends'>
			<div class='container'>
				<p>
					<img src='@/assets/img/light_bulb_32.png' alt='Light Bulb'><span class='has-text-weight-bold'> = person helping to free slaves. </span> Individuals helping the Underground Railroad left lit lamps hanging on their barn doors and sheds overnight to let runaway slaves know they were safe havens where they could sleep or find food and water for their journey. They also used lamps to signal to runaway slaves who were preparing to cross rivers whether there was anyone on the other shore who would report them or try to capture them, or if the coast was clear to swim across.
				</p>
				<p>
					<img src='@/assets/img/star_32.png' alt='Star'><span class='has-text-weight-bold'> = nonprofit helping to free slaves.</span> In the 1800s, slaves trying to escape north to freedom regularly relied on the North star as a beacon and compass because it's the only star in the sky that doesn't change its location. Today, slaves rely on nonprofits to help them gain their freedom and the nonprofits are steadfast in their commitment to free slaves, so we represent them with stars.
				</p>
			</div>
		</div>
	</section>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
import { mapState, mapGetters } from 'vuex'

import mapStyles from '@/mapStyles'
import { curvedLineGenerate } from 'LocalComponents/CurvedPolyline'
import PolylineAnimatedSymbol from 'LocalComponents/PolylineAnimatedSymbol'
import UserPopupWindow from 'LocalComponents/UserPopUpWindow/UserPopupWindow.vue'

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
</style>
