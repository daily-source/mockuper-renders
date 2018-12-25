<template>
	<div class="virtual-railroad-map">
		<section class="section">
			<div class="container">
				<GmapMap
					class='map'
					:center='{lat: 0, lng: 0}'
					:zoom='2'
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
					<GmapInfoWindow
						v-if='selectedUser'
						:position='selectedUser.getUserLocation()'
						:options='infoWindowOptions'
					>
						<div class="user-info-window">
							<h2 class='user-info-window__username'>{{ `${selectedUser.firstName} ${selectedUser.lastName}` }}</h2>
							<div class="user-info-window__avatar">
								<img :src="selectedUser.picture" class='user-info-window__avatar-img' alt="">
							</div>
							<a href="#" class='user-info-window__see-tracks'>See my tracks</a> <br />
							<a href="#" class='user-info-window__view-profile button is-primary is-small'>View Profile</a>
						</div>
					</GmapInfoWindow>
					<GmapMarker
						v-for='(nonprofit, index) in nonprofits'
						:key='`nonprofit-${index}`'
						:position='{lat: parseFloat(nonprofit.latitude), lng: parseFloat(nonprofit.longitude)}'
						:icon='require("@/assets/img/star_16.png")'
					/>
				</GmapMap>
			</div>
		</section>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'VirtualRailroadMap',

	data () {
		return {
			userPosition: null,
			infoWindowOptions: {
				pixelOffset: {
					width: 0,
					height: -10,
				}
			},
			selectedUser: null,
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

		setSelectedUser (user) {
			this.selectedUser = user
		},
	},

	computed: {
		...mapState({
			users: state => state.users.data,
			nonprofits: state => state.nonprofits.data,
		})
	},

	watch: {
		userPosition () {
			console.log('changed')
		}
	}
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
