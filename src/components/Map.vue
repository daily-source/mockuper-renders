<template>
	<div class="virtual-railroad-map">
		<section class="section">
			<div class="container">
				<GmapMap
					class='map'
					:center='{lat: 0, lng: 0}'
					:zoom='2'
					@click='updateUserLocation'
				>
					<GmapMarker
						v-if='userPosition'
						:position='userPosition'
					/>
				</GmapMap>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: 'VirtualRailroadMap',

	data () {
		return {
			userPosition: null,
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
		}
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
</style>
