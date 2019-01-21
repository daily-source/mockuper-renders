<template>
	<div class='home-map'>
		<div class='virtual-railroad-map-container'>
			<virtual-railroad-map 
				:users='users'	 
				:nonprofits='nonprofits'
			/>	
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
import { mapState } from 'vuex'

import VirtualRailroadMap from 'LocalComponents/VirtualRailroadMap'

export default {
	name: 'HomeMap',

	data () {
		return {
			callToActionTimer: 180000,
			showCallToAction: false,
		}
	},

	mounted () {
		setTimeout(() => {
			this.showCallToAction = true
		}, this.callToActionTimer)
	},
	
	components: {
		VirtualRailroadMap,
	},

	computed: {
		...mapState({
			users: state => state.users.data,
			nonprofits: state => state.nonprofits.data,
		}),
	},
}
</script>

<style lang='scss' scoped>
.virtual-railroad-map {
	margin-bottom: 1em;	
}
</style>
